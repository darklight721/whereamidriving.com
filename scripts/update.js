var mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('../app/models/stats');
var RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats'),
    data = require('../public/data.json');

data.forEach(function(data) {
  RegionStats.update(
    { name: data.region },
    { name: data.region },
    { upsert: true }
  ).exec();

  data.cities.forEach(function(city) {
    CityStats.update(
      { name: city.name },
      { name: city.name, region: data.region },
      { upsert: true }
    ).exec();
  });
});

console.log('Done.');
