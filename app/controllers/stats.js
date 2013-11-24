var mongoose = require('mongoose'),
    RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats');

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
  RegionStats.find({}, { _id: 0, name: 1, total: 1, count: 1 }, function(err, regionStats) {
    if (err) return handleError(res);

    CityStats.find({}, { _id: 0, name: 1, stats: 1 }, function(err, cityStats) {
      if (err) return handleError(res);

      res.json({ regionStats: regionStats, cityStats: cityStats });
    });
  });
};
