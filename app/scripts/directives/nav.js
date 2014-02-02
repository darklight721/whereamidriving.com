'use strict';

angular.module('whereAmIdrivingApp')
  .directive('nav', function () {
    return {
      templateUrl: 'views/partials/nav.html',
      restrict: 'E',
      replace: true,
      scope: { active: '@' },
      link: function postLink(scope, element) {
        var $navs = element.find('.nav');
        scope.$watch('active', function(active) {
          $navs.filter('.active').removeClass('active');
          $navs.filter('.nav-' + active).addClass('active');
        });
      }
    };
  });
