var mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('../app/models/region');
require('../app/models/city');
var data = require('./data'),
    Region = mongoose.model('Region'),
    City = mongoose.model('City');

City.remove({}).exec();
Region.remove({}).exec();

data.forEach(function(data) {
  Region.create({ name: data.region }, function(err, region) {
    if (err) {
      console.log('Error populating regions!');
      return;
    }
    console.log('Region: ' + region.name + ' created.');

    data.cities.forEach(function(city) {
      var _city = new City(city);
      _city.region = region;
      _city.save(function(err, city) {
        if (err) console.log('Error populating cities!');
        else console.log('City: ' + city.name + ' created.');
      });
    });
  });
});

console.log('Data import finished.');
