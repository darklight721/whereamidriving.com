'use strict';

angular.module('whereAmIdrivingApp')
  .factory('Server', function ($http, $q, Store) {
    // Service logic
    var dataFile = 'data.json',
        isDataCurrent = dataFile === Store.get('version');

    function reject(deferred) {
      return function(error) { deferred.reject(error); };
    }

    function get(key) {
      var deferred = $q.defer(),
          value = Store.get(key);

      if (isDataCurrent && value) {
        deferred.resolve(value);
      }
      else {
        $http.get(dataFile).success(function(data) {
          if (!data) return reject(deferred)('No data');

          isDataCurrent = true;
          Store.set('version', dataFile);
          Store.set('regions', _.chain(data).pluck('region').uniq().value());
          Store.set('cities', _.chain(data).map(function(data) {
            return _.map(data.cities, function(city) {
              city.region = data.region;
              return city;
            });
          }).flatten().value());

          deferred.resolve(Store.get(key));
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

        $http.get('/api/stats').success(function(data) {
          deferred.resolve(data);
        }).error(reject(deferred));

        return deferred.promise;
      },
      submitScore: function(score) {
        var deferred = $q.defer();

        $http.post('/api/submit_score', score).success(function() {
          deferred.resolve();
        }).error(reject(deferred));

        return deferred.promise;
      }
    };
  });
