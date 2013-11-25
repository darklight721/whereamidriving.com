'use strict';

angular.module('GuessApp')
  .controller('ResultCtrl', function ($scope, $location, Session, Server) {

    $scope.init = function() {
      if (Session.isOver()) {
        $scope.score = Session.getScore() + Session.getLife() * 10;
        $scope.stats = Session.getStats();
        Server.submitScore({
          score: $scope.score,
          region: Session.getRegion(),
          stats: $scope.stats
        }).then(Session.resetLevels);
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

    $scope.buildGMapsLink = function(city) {
      return 'http://maps.google.com/?q=' + city.replace(/\s/g, '+');
    };

  });
