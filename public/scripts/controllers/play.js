'use strict';

angular.module('GuessApp')
  .controller('PlayCtrl', function ($scope, $routeParams, $location, Engine, Record) {

    $scope.level = parseInt($routeParams['level'], 10) - 1;

    $scope.play = function() {
      var city = Engine.play($scope.level);
      if (city) {
        $scope.city = city;
        loadAnswerPoints();
      }
      else {
        $location.path('/');
      }
    };

    $scope.updatePoints = function() {
      if (!$scope.answer && $scope.points) {
        $scope.points -= 10;
      }
    };

    $scope.choose = function(answer) {
      $scope.answer = answer;

      Engine.check($scope.level, answer).then(
        function(isCorrect) {
          Record.set($scope.level, {
            answer: answer,
            score: isCorrect ? $scope.points : 0
          });
          loadAnswerPoints();
        },
        function() {
          $scope.answer = false;
        }
      );
    };

    $scope.next = function() {
      var next = Record.findNextMissing($scope.level);
      return next >= 0 ? '/play/' + (next + 1) : '/result';
    };

    $scope.state = function(answer) {
      return $scope.answer.answer != answer ? '' :
             $scope.answer.score > 0 ? 'correct' :
             'wrong';
    }

    function loadAnswerPoints() {
      $scope.answer = Record.get($scope.level);
      $scope.points = $scope.answer ? $scope.answer.score : 100;
    }

  });
