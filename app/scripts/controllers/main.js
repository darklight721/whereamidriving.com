'use strict';

angular.module('whereAmIdrivingApp')
  .controller('MainCtrl', function ($scope, $location, Server, Session) {

    Server.regions().then(function(regions) {
      $scope.regions = regions;
    });

    $scope.play = function(region) {
      Server.cities(region).then(function(cities) {
        Session.new(cities, region);
        $location.path('/play');
      });
    };

  });
