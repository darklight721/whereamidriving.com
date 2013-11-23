'use strict';

angular.module('GuessApp')
  .controller('StatsCtrl', function ($scope, Server) {

    $scope.stats = Server.stats();

  });
