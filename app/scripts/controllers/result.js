'use strict';

angular.module('whereAmIdrivingApp')
  .controller('ResultCtrl', function ($scope, $location, Session, Server) {

    $scope.init = function() {
      if (Session.isOver()) {
        $scope.score = Session.getScore() + Session.getLife() * 10;
        $scope.mistakes = _.where(Session.getStats(), { correct: false });
        Server.submitScore({
          score: $scope.score,
          region: Session.getRegion(),
          stats: Session.getStats()
        }).then(Session.resetLevels);
      }
      else {
        $location.path('/');
      }
    };

    $scope.buildTwitterLink = function() {
      var params = [
        ['url', 'http://whereamidriving.com'],
        ['text', 'Beat my score of ' + $scope.score + ' in'],
        ['related', 'pr00t']
      ];

      return 'https://twitter.com/share?' + params.map(function(param) {
        return param[0] + '=' + encodeURIComponent(param[1]);
      }).join('&');
    };

    $scope.buildGMapsLink = function(city) {
      return 'http://maps.google.com/?q=' + city.replace(/\s/g, '+');
    };

    $scope.playAgain = function() {
      Session.new();
      $location.path('/play');
    };

  });
