var mongoose = require('mongoose'),
    RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats'),
    _ = require('underscore');

function handleError(res) {
  res.json(500, { error: 'Error' });
}

exports.submitScore = function(req, res) {
  var score = req.body.score,
      region = req.body.region,
      stats = req.body.stats;

  if (score === undefined || region === undefined || stats === undefined)
    return handleError(res);

  RegionStats.update(
    { name: region },
    { $inc: { total: score, count: 1 } }
  ).exec();

  var groupedCities = stats.reduce(function(cities, stats) {
    cities[stats.correct ? 'correct' : 'wrong'].push(stats.city);
    return cities;
  }, { correct: [], wrong: [] });

  CityStats.update(
    { name: { $in: groupedCities.correct } },
    { $inc: { stats: 1 } },
    { multi: true }
  ).exec();

  CityStats.update(
    { name: { $in: groupedCities.wrong } },
    { $inc: { stats: -1 } },
    { multi: true }
  ).exec();

  res.json(200);
};

exports.get = function(req, res) {
  RegionStats.find({}, function(err, regionStats) {
    if (err) return handleError(res);

    CityStats.aggregate(
      { $sort: { stats: 1 } },
      { $group: {
          _id: '$region',
          easiestCity: { $last: '$name' },
          easiestStats: { $last: '$stats' },
          hardestCity: { $first: '$name' },
          hardestStats: { $first: '$stats' }
        }
      },
      function(err, result) {
        if (err) handleError(res);

        var stats = result.reduce(function(stats, result) {
          var region = _.findWhere(regionStats, { name: result._id });
          if (region) {
            stats.push(_.extend({
              region: result._id,
              easiestCity: result.easiestCity,
              hardestCity: result.hardestCity
            }, _.pick(region, 'total', 'count')));
          }
          return stats;
        }, []);

        var allRegion = _.findWhere(regionStats, { name: 'All' });
        if (allRegion) {
          stats.push(_.extend({
            region: allRegion.name,
            easiestCity: _.max(result, function(result) { return result.easiestStats }).easiestCity,
            hardestCity: _.min(result, function(result) { return result.hardestStats }).hardestCity
          }, _.pick(allRegion, 'total', 'count')));
        }

        res.json(stats);
      }
    );
  });
};
