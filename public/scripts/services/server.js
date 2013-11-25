'use strict';

angular.module('GuessApp')
  .factory('Server', function ($http, $q, Store) {
    // Service logic
    var isInitialized = false;

    function reject(deferred) {
      return function(error) { deferred.reject(error) };
    }

    function get(key) {
      var deferred = $q.defer(),
          value = isInitialized ? Store.get(key) : null;

      if (value) {
        deferred.resolve(value);
      }
      else {
        $http.get('/config.json').success(function(data) {
          var version = data && data.version || undefined;
          if (version === Store.get('version') && value) {
            deferred.resolve(value);
            isInitialized = true;
          }
          else {
            $http.get('/data.json').success(function(data) {
              if (!data) reject(deferred)('No data');

              Store.set('version', version);
              Store.set('regions', _.chain(data).pluck('region').uniq().value());
              Store.set('cities', _.chain(data).map(function(data) {
                return _.map(data.cities, function(city) {
                  city.region = data.region;
                  return city;
                });
              }).flatten().value());

              deferred.resolve(Store.get(key));
              isInitialized = true;
            }).error(reject(deferred));
          }
        }).error(reject(deferred));
      }

      return deferred.promise;
    }

    // Public API here
    return {
      regions: function() {
        return get('regions');
      },
      cities: function(region) {
        var deferred = $q.defer();

        get('cities').then(function(cities) {
          deferred.resolve(region ? _.where(cities, { region: region }) : cities);
        }, reject(deferred));

        return deferred.promise;
      },
      stats: function() {
        var deferred = $q.defer();

        $http.get('/stats').success(function(data) {
          deferred.resolve(data);
        }).error(reject(deferred));

        return deferred.promise;
      },
      submitScore: function(score) {
        return $http.post('/submit_score', score);
      }
    };
  });
