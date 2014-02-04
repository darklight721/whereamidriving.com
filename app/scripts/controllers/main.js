'use strict';

angular.module('whereAmIdrivingApp')
  .controller('MainCtrl', function ($scope, $location, Server, Session) {

    $scope.modes = ['Panoramic', '3 Streets 1 City'];
    $scope.mode = $scope.modes[0];

    Server.regions().then(function(regions) {
      $scope.regions = ['All'].concat(regions);
      $scope.region = $scope.regions[0];
    });

    $scope.play = function(region) {
      Server.cities(region).then(function(cities) {
        Session.new(cities, region);
        $location.path('/play');
      });
    };

  });
