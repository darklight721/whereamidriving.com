'use strict';

angular.module('whereAmIdrivingApp')
  .factory('Session', function () {
    // Service logic
    var levels = [], current = 0,
        life = 15, score = 0,
        stats = [], region = '';

    function pickRandom(list) {
      return list[_.random(list.length - 1)];
    }

    function randomChoices(count, initial) {
      var set = {}, length = 1;
      set[initial] = 1;

      while (length < count) {
        var index = _.random(levels.length - 1);
        while (set[levels[index].name]) {
          index = (index + 1) % levels.length;
        }
        set[levels[index].name] = 1;
        length++;
      }

      return _.shuffle(_.keys(set));
    }

    // Public API here
    return {
      new: function(cities, region_) {
        levels = _.shuffle(cities);
        current = 0;
        life = 15;
        score = 0;
        stats.length = 0;
        region = region_ || 'All';
      },
      play: function() {
        var level = levels[current];
        if (life && level) {
          return {
            position: pickRandom(level.positions),
            choices: randomChoices(
              current < 5 ? 2 : current < 10 ? 3 : 4, level.name
            )
          };
        }
        return false;
      },
      answer: function(answer) {
        var currentLevel = levels[current] || {},
            isCorrect = answer === currentLevel.name;

        if (isCorrect) score += 10;
        else this.deductLife(5);
        stats.push({
          city: currentLevel.name,
          region: currentLevel.region,
          correct: isCorrect
        });
        current++;
        return isCorrect;
      },
      getLife: function() {
        return life;
      },
      deductLife: function(factor) {
        life = Math.max(0, life - factor);
      },
      getScore: function() {
        return score;
      },
      getStats: function() {
        return stats;
      },
      getRegion: function() {
        return region;
      },
      isOver: function() {
        return current && (life === 0 || current === levels.length);
      },
      resetLevels: function() {
        levels.length = 0;
        current = 0;
      }
    };
  });
