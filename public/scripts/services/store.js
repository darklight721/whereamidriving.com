'use strict';

angular.module('GuessApp')
  .factory('Store', function () {
    var lstore = window.localStorage;

    function type(key) {
      return key + '_t';
    }

    // Public API here
    return {
      get: function(key) {
        var value = lstore.getItem(key);
        return lstore.getItem(type(key)) === 'obj' ?
               JSON.parse(value) : value;
      },
      set: function(key, value) {
        var obj = typeof value === 'object' ? 'obj' : '';
        lstore.setItem(type(key), obj);
        lstore.setItem(key, obj ? JSON.stringify(value) : value);
      },
      clear: function(key) {
        if (key) {
          lstore.removeItem(type(key));
          lstore.removeItem(key);
        }
        else {
          lstore.clear();
        }
      }
    };
  });
