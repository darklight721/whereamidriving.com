'use strict';

angular.module('whereAmIdrivingApp')
  .directive('dropdown', function () {
    return {
      templateUrl: 'views/partials/dropdown.html',
      restrict: 'E',
      replace: true,
      scope: { options: '=', selected: '=', icon: '@' },
      controller: function($scope) {
        $scope.select = function(option) {
          $scope.selected = option;
        };
      },
      link: function postLink(scope) {

      }
    };
  });
