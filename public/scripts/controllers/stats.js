'use strict';

angular.module('GuessApp')
  .controller('StatsCtrl', function ($scope, Engine) {

    $scope.regions = Engine.regions();
    $scope.stats = Engine.stats();

  });
