var mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('../app/models/stats');
var RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats'),
    data = require('../public/data.json');

RegionStats.remove({}, function(err) {
  if (err) return console.log('Error removing RegionStats');

  CityStats.remove({}, function(err) {
    if (err) return console.log('Error removing CityStats');

    RegionStats.create({ name: 'All' }, function(err, res) { console.log(res); });

    data.forEach(function(data) {
      RegionStats.create({ name: data.region }, function(err, res) { console.log(res); });

      data.cities.forEach(function(city) {
        CityStats.create({ name: city.name }, function(err, res) { console.log(res) });
      });
    });
  });
});


