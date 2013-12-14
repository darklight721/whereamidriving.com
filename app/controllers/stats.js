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
    { $inc: { counter: 1, stats: 1 } },
    { multi: true }
  ).exec();

  CityStats.update(
    { name: { $in: groupedCities.wrong } },
    { $inc: { counter: 1 } },
    { multi: true }
  ).exec();

  res.json(200);
};

exports.get = function(req, res) {
  RegionStats.find({}, 'name total count', function(err, regionStats) {
    if (err) return handleError(res);

    CityStats.find({}, 'name region counter stats', function(err, cityStats) {
      if (err) return handleError(res);

      res.json({
        regionStats: regionStats,
        cityStats: cityStats
      });
    });
  });
};
