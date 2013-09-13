var mongoose = require('mongoose'),
    City = mongoose.model('City');

exports.generate = function(req, res) {

};

exports.check = function(req, res) {
  var id = req.body.id,
      answer = req.body.answer;

  if (id && answer) {
    City.findById(id, 'name', function(err, city) {
      if (err) {
        res.json(500, { error: 'Server error.' });
      }
      else if (city) {
        res.json({ correct: city.name == answer });
      }
      else {
        res.json(500, { error: 'Not found.' });
      }
    });
  }
  else {
    res.json(500, { error: 'Parameters missing.' });
  }
};
