'use strict';

angular.module('GuessApp')
  .controller('MainCtrl', function ($scope, $location, Server, Session) {

    $scope.regions = Server.regions();

    $scope.play = function(region) {
      Server.cities(region).then(function(cities) {
        Session.new(cities, region);
        $location.path('/play');
      });
    };

  });
