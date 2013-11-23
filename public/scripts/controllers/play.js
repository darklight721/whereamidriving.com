'use strict';

angular.module('GuessApp')
  .controller('PlayCtrl', function ($scope, $location, Session) {

    $scope.play = function() {
      var city = Session.play();
      if (city) {
        $scope.city = city;
        $scope.answer = null;
      }
      else {
        $location.path('/');
      }
    };

    $scope.life = function() {
      return Session.getLife();
    };

    $scope.updateLife = function() {
      if ($scope.answer === null)
        Session.deductLife(1);
    };

    $scope.score = function() {
      return Session.getScore();
    };

    $scope.choose = function(answer) {
      $scope.answer = {
        city: answer,
        correct: Session.answer(answer)
      };
    };

    $scope.state = function(city) {
      return !$scope.answer || $scope.answer.city !== city ? '' :
             $scope.answer.correct ? 'correct' :
             'wrong';
    };

    $scope.next = function() {
      if (Session.isOver()) {
        $location.path('/result');
      }
      else {
        $scope.play();
      }
    };

  });
