var mongoose = require('mongoose'),
    Stats = mongoose.model('Stats'),
    City = mongoose.model('City');

exports.submitScore = function(req, res) {
  var score = req.body.score;

  if (score == undefined) {
    res.json(500, { error: 'Error' });
  }
  else {
    Stats.get(function(err, stats) {
      if (err) {
        res.json(500, { error: 'Error' });
        return;
      }

      stats.update({ $inc: { total: score, count: 1 } }, function(err) {
        if (err) {
          res.json(500, { error: 'Error' });
        }
        else {
          res.json({ message: 'Success' });
        }
      });
    });
  }
};

exports.get = function(req, res) {
  Stats.get(function(err, stats) {
    if (err) {
      res.json(500, { error: 'Error' });
      return;
    }

    var data = {
      count: stats.count,
      average: stats.average()
    };

    City.aggregate(
      { $sort: { stats: 1 } },
      { $group: {
          _id: '$region',
          easiestCity: { $last: '$name' },
          easiestStats: { $last: '$stats' },
          hardestCity: { $first: '$name' },
          hardestStats: { $first: '$stats' }
        }
      },
      { $project: {
          _id: 0,
          region: '$_id',
          easiestCity: { name: '$easiestCity', stats: '$easiestStats' },
          hardestCity: { name: '$hardestCity', stats: '$hardestStats' }
        }
      },
      function(err, result) {
        if (err) {
          res.json(500, { error: 'Error' });
          return;
        }

        data.cities = result;
        res.json(data);
      }
    );
  });
};
