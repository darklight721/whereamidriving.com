'use strict';

angular.module('GuessApp')
  .directive('life', function () {
    var max = 15;

    return {
      template: '<div class="progress"><div class="bar"></div></div>',
      restrict: 'E',
      replace: true,
      scope: { count: '@' },
      link: function postLink(scope, element, attrs) {
        var $bar = element.find('.bar');

        scope.$watch('count', function(count) {
          count = parseInt(count);
          $bar.css('width', count / max * 100 + '%');
        });
      }
    };
  });
