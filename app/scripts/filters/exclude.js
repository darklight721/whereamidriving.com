'use strict';

angular.module('whereAmIdrivingApp')
  .filter('exclude', function () {
    return function (items, excludedItem) {
      return items.filter(function(item) {
        return item !== excludedItem;
      });
    };
  });
