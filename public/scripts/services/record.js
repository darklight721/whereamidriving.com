'use strict';

angular.module('GuessApp')
  .factory('Record', function () {
    // Service logic
    var answers = [];

    // Public API here
    return {
      new: function(limit) {
        answers.length = 0;
        for (var i = 0; i < limit; i++) {
          answers.push(false);
        }
      },
      set: function(level, answer) {
        answers[level] = answer;
      },
      get: function(level) {
        return level === undefined ? answers : answers[level];
      },
      count: function() {
        return answers.length;
      },
      sum: function() {
        return answers.reduce(function(sum, answer) {
          return sum + (answer ? answer.score : 0);
        }, 0);
      },
      findNextMissing: function(start) {
        start = start || 0;
        for (var i = start, length = answers.length; i < length; i++) {
          if (!answers[i]) return i;
        }
        for (var i = 0; i < start; i++) {
          if (!answers[i]) return i;
        }
        return -1;
      }
    };
  });
