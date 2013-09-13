'use strict';

angular.module('GuessApp')
  .directive('levels', function (Record) {
    return {
      templateUrl: 'views/levels.html',
      restrict: 'E',
      replace: true,
      scope: { active: '@' },
      controller: function($scope) {
        $scope.levels = Record.get();
      }
    };
  });
