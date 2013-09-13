var mongoose = require('mongoose'),
    Region = mongoose.model('Region');

exports.all = function(req, res) {
  Region.find(function(err, regions) {
    if (err) {
      res.json(500, { error: 'Server error.' });
    }
    else {
      regions = regions || [];
      res.json(regions.map(function(region) {
        return { id: region._id, name: region.name };
      }));
    }
  });
};
