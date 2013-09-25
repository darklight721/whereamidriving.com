'use strict';

angular.module('GuessApp')
  .factory('Engine', function ($http, $q) {
    // Service logic
    var levels = [];

    // Public API here
    return {
      regions: function() {
        var deferred = $q.defer();

        $http.get('/regions', { cache: true }).success(function(data) {
          deferred.resolve(data);
        }).error(function(data, status) {
          // sample
          deferred.resolve([
            { id: 1, name: 'USA' },
            { id: 2, name: 'Rest of America' },
            { id: 3, name: 'Europe' },
            { id: 4, name: 'Rest of the World' }
          ]);
          // deferred.reject();
        });

        return deferred.promise;
      },
      generate: function(region) {
        var deferred = $q.defer();

        $http.get(
          '/generate' + (region ? '?region=' + region : '')
        ).success(function(data) {
          levels = data;
          deferred.resolve();
        }).error(function(data, status) {
          // sample
          levels = [
            { id: 1, position: { lat: 37.869566, lng: -122.252523 }, choices: ['Berkeley', 'Cupertino'] },
            { id: 1, position: { lat: 42.345592, lng: -71.098344 }, choices: ['Boston', 'Phoenix', 'Las Vegas'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: 40.730125, lng: -73.99134700000002 }, choices: ['Newark', 'Atlanta', 'Seattle', 'San Diego'] },
            { id: 1, position: { lat: -33.867428, lng: 151.19576699999993 }, choices: ['Miami', 'Sacramento', 'Houston'] },
            { id: 1, position: { lat: 37.869566, lng: -122.252523 }, choices: ['Reno', 'Chicago', 'Toronto'] }
          ];
          deferred.resolve();
          // deferred.reject();
        });

        return deferred.promise;
      },
      play: function(level) {
        return levels[level] || false;
      },
      check: function(level, answer) {
        var deferred = $q.defer(),
            city = levels[level];

        if (city && answer) {
          $http.post('/check', {
            id: city.id,
            answer: answer
          }).success(function(data) {
            data ? deferred.resolve(data.correct) : deferred.reject();
          }).error(function(data, status) {
            // sample
            deferred.resolve(true);
            //deferred.reject();
          });
        }
        else {
          deferred.reject();
        }

        return deferred.promise;
      },
      levels: function() {
        return levels.length;
      },
      submitScore: function(score) {
        return $http.post('/submit_score', {
          score: score
        });
      },
      stats: function() {
        var deferred = $q.defer();

        $http.get('/stats', { cache: true }).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          // sample
          deferred.resolve({
            count: 5,
            average: 1200,
            cities: {
              '1': {
                easiestCity: { name: 'New York City', stats: 100 },
                hardestCity: { name: 'Columbus', stats: -3 }
              },
              '2': {
                easiestCity: { name: 'Rio de Janeiro', stats: 100 },
                hardestCity: { name: 'Arequipa', stats: -3 }
              },
              '3': {
                easiestCity: { name: 'London', stats: 100 },
                hardestCity: { name: 'Nice', stats: -3 }
              },
              '4': {
                easiestCity: { name: 'Tokyo', stats: 100 },
                hardestCity: { name: 'Bangkok', stats: -3 }
              }
            }
          });
          //deferred.reject();
        });

        return deferred.promise;
      }
    };
  });
