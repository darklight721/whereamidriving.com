if (process.argv.length < 3) {
  console.log('Missing parameter!');
  process.exit(1);
}

var mongoose = require('mongoose'),
    db = require('../lib/db/mongo').mongoose.connection;

db.once('open', function() {
  require('../lib/models/stats');

  var RegionStats = mongoose.model('RegionStats'),
      CityStats = mongoose.model('CityStats'),
      _ = require('underscore'),
      fs = require('fs'),
      data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

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
