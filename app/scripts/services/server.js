'use strict';

angular.module('whereAmIdrivingApp')
  .factory('Server', function ($http, $q, Store) {
    // Service logic
    var dataFile = 'data.json',
        isDataCurrent = dataFile === Store.get('version');

    function get(key) {
      var deferred = $q.defer(),
          value = Store.get(key);

      if (isDataCurrent && value) {
        deferred.resolve(value);
      }
      else {
        $http.get(dataFile).success(function(data) {
          if (!data) return deferred.reject('No data');

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
        }).error(deferred.reject);
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
        }, deferred.reject);

        return deferred.promise;
      },
      stats: function() {
        var deferred = $q.defer();

        $http.get('/api/stats')
             .success(deferred.resolve)
             .error(deferred.reject);

        return deferred.promise;
      },
      submitScore: function(score) {
        var deferred = $q.defer();

        $http.post('/api/submit_score', score)
             .success(deferred.resolve)
             .error(deferred.reject);

        return deferred.promise;
      }
    };
  });
