var mongoose = require('mongoose'),
    db = require('./mongo').mongoose.connection,
    _ = require('underscore');

db.once('open', function() {
  require('../models/stats');
  var RegionStats = mongoose.model('RegionStats'),
      CityStats = mongoose.model('CityStats'),
      data = require('../../app/data.json');

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
});
