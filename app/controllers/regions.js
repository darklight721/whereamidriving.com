var mongoose = require('mongoose'),
    Region = mongoose.model('Region');

exports.all = function(req, res) {
  Region.find(function(err, regions) {
    if (err) {
      res.json(500, { error: 'Server error.' });
    }
    else {
      res.json(regions);
    }
  });
};
