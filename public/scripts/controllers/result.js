'use strict';

angular.module('GuessApp')
  .controller('ResultCtrl', function ($scope, $location, Session, Server) {

    $scope.init = function() {
      var stats = Session.getStats();
      if (Session.isOver() && stats.length) {
        $scope.score = Session.getScore() + Session.getLife() * 10;
        Server.submitScore($scope.score, stats);
      }
      else {
        $location.path('/');
      }
    };

    $scope.buildTwitterParams = function() {
      var params = [
        ['url', 'http://whereamidriving.com'],
        ['text', 'Beat my score of ' + $scope.score + ' in'],
        ['related', 'pr00t']
      ];

      return params.map(function(param) {
        return param[0] + '=' + encodeURIComponent(param[1]);
      }).join('&');
    };

  });
