var mongoose = require('mongoose'),
    db = require('./mongo').mongoose.connection;

db.once('open', function() {
  require('../models/stats');
  var RegionStats = mongoose.model('RegionStats'),
      CityStats = mongoose.model('CityStats'),
      data = require('../../app/data.json');

  RegionStats.remove({}, function(err) {
    if (err) return console.log('Error removing RegionStats');

    CityStats.remove({}, function(err) {
      if (err) return console.log('Error removing CityStats');

      RegionStats.create({ name: 'All' }, function(err, res) { console.log(res); });

      data.forEach(function(data) {
        RegionStats.create({ name: data.region }, function(err, res) { console.log(res); });

        data.cities.forEach(function(city) {
          CityStats.create({ name: city.name, region: data.region }, function(err, res) { console.log(res) });
        });
      });
    });
  });
});
