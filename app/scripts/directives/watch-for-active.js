'use strict';

angular.module('whereAmIdrivingApp')
  .directive('watchForActive', function ($location) {

    var map = {
      '#/': function(path) {
        return path !== '/stats' && path !== '/about';
      },
      '#/stats': function(path) {
        return path === '/stats';
      },
      '#/about': function(path) {
        return path === '/about';
      }
    };

    return {
      link: function postLink(scope, element, attrs) {
        scope.$watch(function() {
          return $location.path();
        }, function(path) {
          var compare = map[attrs.href];
          if (compare && compare(path)) {
            element.parent().addClass('pure-menu-selected');
          }
          else {
            element.parent().removeClass('pure-menu-selected');
          }
        });
      }
    };
  });
