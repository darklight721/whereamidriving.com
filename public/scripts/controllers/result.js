'use strict';

angular.module('GuessApp')
  .controller('ResultCtrl', function ($scope, $location, Record, Rating, Engine) {

    $scope.init = function() {
      if (Record.count() === 0) {
        $location.path('/');
      }
      else {
        var missing = Record.findNextMissing();
        if (missing >= 0) {
          $location.path('/play/' + (missing + 1));
          return;
        }

        $scope.sum = Record.sum();
        $scope.rating = Rating.get($scope.sum / Record.count());
        Engine.submitScore($scope.sum);
      }
    };

    $scope.buildTwitterParams = function() {
      if (!$scope.rating) return '';

      var params = [
        ['url', 'http://whereamidriving.com'],
        ['text', 'I got "' + $scope.rating.rate + '" with a score of ' + $scope.sum + ' in'],
        ['related', 'pr00t']
      ];

      return params.map(function(param) {
        return param[0] + '=' + encodeURIComponent(param[1]);
      }).join('&');
    };

  });
