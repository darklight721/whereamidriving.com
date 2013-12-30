'use strict';

var mongoose = require('mongoose'),
    RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats');

function handleError(res, err) {
  res.json(500, { error: err || 'Error' });
}

exports.submitScore = function(req, res) {
  var score = req.body.score,
      region = req.body.region,
      stats = req.body.stats;

  if (score === undefined || region === undefined || stats === undefined)
    return handleError(res, 'Missing Parameter(s)!');

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

exports.stats = function(req, res) {
  RegionStats.find({}, 'name total count', function(err, regionStats) {
    if (err) return handleError(res, err);

    CityStats.find({}, 'name region counter stats', function(err, cityStats) {
      if (err) return handleError(res, err);

      res.json({
        regionStats: regionStats,
        cityStats: cityStats
      });
    });
  });
};
