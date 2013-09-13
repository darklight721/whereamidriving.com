'use strict';

angular.module('GuessApp')
  .directive('watchForActive', function ($location) {

    var map = {
      '#/': function(path) {
        return path != '/stats' && path != '/about';
      },
      '#/stats': function(path) {
        return path == '/stats';
      },
      '#/about': function(path) {
        return path == '/about';
      }
    };

    return {
      link: function postLink(scope, element, attrs) {
        scope.$watch(function() {
          return $location.path();
        }, function(path) {
          var compare = map[attrs.href];
          if (compare && compare(path)) {
            element.addClass('active');
          }
          else {
            element.removeClass('active');
          }
        });
      }
    };
  });
