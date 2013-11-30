var mongoose = require('mongoose'),
    config = require('../config/config'),
    _ = require('underscore');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('../app/models/stats');
var RegionStats = mongoose.model('RegionStats'),
    CityStats = mongoose.model('CityStats'),
    data = require('../public/data.json');

RegionStats.find({}, function(err, regions) {
  if (err) return console.log('Error querying regions!');

  CityStats.find({}, function(err, cities) {
    if (err) return console.log('Error querying cities!');

    data.forEach(function(data) {
      if (!_.findWhere(regions, { name: data.region }))
        RegionStats.create({ name: data.region }, function(err, res) { console.log(res); });

      data.cities.forEach(function(city) {
        if (!_.findWhere(cities, { name: city.name }))
          CityStats.create({ name: city.name, region: data.region }, function(err, res) { console.log(res); });
      });
    });
  });
});
