'use strict';

angular.module('whereAmIdrivingApp')
  .factory('Session', function () {
    // g for global
    var g = {
      current: -1,
      score: 0,
      life: -1,
      region: '',
      levels: [],
      stats: [],
      maxLife: 3
    };

    function pickRandom(list) {
      return list[_.random(list.length - 1)];
    }

    function randomChoices(count, initial) {
      var set = {}, length = 1;
      set[initial] = 1;

      while (length < count) {
        var index = _.random(g.levels.length - 1),
            item = g.levels[index].name;

        while (set[item]) {
          index = (index + 1) % g.levels.length;
          item = g.levels[index].name;
        }

        set[item] = 1;
        length++;
      }

      return _.shuffle(_.keys(set));
    }

    function get(prop) {
      return function() { return g[prop]; };
    }

    // Public API here
    return {
      new: function(cities, region) {
        g.current = 0;
        g.score = 0;
        g.life = g.maxLife;
        g.stats.length = 0;

        if (cities) {
          g.levels = _.shuffle(cities);
          g.region = region || 'All';
        }
        else {
          g.levels = _.shuffle(g.levels);
        }
      },
      play: function() {
        var level = g.levels[g.current];

        if (level && g.life) {
          return {
            position: pickRandom(level.positions),
            choices: randomChoices(
              g.current < 5 ? 2 : g.current < 10 ? 3 : 4, level.name
            )
          };
        }

        return false;
      },
      answer: function(answer) {
        var currentLevel = g.levels[g.current] || {},
            isCorrect = answer === currentLevel.name;

        if (isCorrect) g.score += 10;
        else g.life -= g.life ? 1 : 0;

        g.stats.push({
          city: currentLevel.name,
          region: currentLevel.region,
          correct: isCorrect
        });
        g.current++;

        return isCorrect;
      },
      isOver: function() {
        return g.life === 0 || g.current === g.levels.length;
      },
      resetLevels: function() {
        g.current = -1;
        g.life = -1;
      },
      getLife: get('life'),
      getMaxLife: get('maxLife'),
      getScore: get('score'),
      getStats: get('stats'),
      getRegion: get('region')
    };
  });
