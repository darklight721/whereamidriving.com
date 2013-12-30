'use strict';

angular.module('whereAmIdrivingApp', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/play', {
        templateUrl: 'partials/play',
        controller: 'PlayCtrl'
      })
      .when('/result', {
        templateUrl: 'partials/result',
        controller: 'ResultCtrl'
      })
      .when('/stats', {
        templateUrl: 'partials/stats',
        controller: 'StatsCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
