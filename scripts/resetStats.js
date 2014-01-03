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
      fs = require('fs'),
      data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

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
