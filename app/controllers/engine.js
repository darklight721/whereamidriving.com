var _ = require('underscore'),
    mongoose = require('mongoose'),
    City = mongoose.model('City');

function random(n) {
  return Math.floor(Math.random() * n);
}

function randomUniqueSet(length, list, options) {
  if (!length || !list) return [];
  options = options || {};

  var listLength = list.length,
      setLength = Math.min(length, listLength),
      set = {}, setCounter = 0,
      initial = options.initial, transform = options.transform;

  if (initial) {
    set[initial._id] = transform ? transform(initial) : initial;
    setCounter++;
  }

  while (setCounter < setLength) {
    var n = random(listLength),
        item = list[n];

    while (set[item._id]) {
      n = (n + 1) % listLength;
      item = list[n];
    }

    set[item._id] = transform ? transform(item, setCounter) : item;
    setCounter++;
  }

  return options.shuffle ? _.shuffle(_.values(set)) : _.values(set);
}

exports.generate = function(req, res) {
  var regionId = req.query.region;
  City.find(regionId ? { region: regionId } : {}, function(err, cities) {
    if (err) {
      res.json(500, { error: 'Server error.' });
    }
    else {
      res.json(randomUniqueSet(12, cities, {
        transform: function(city, index) {
          return {
            id: city._id,
            position: city.positions[random(city.positions.length)],
            choices: randomUniqueSet(index < 4 ? 2 : index < 8 ? 3 : 4, cities, {
              initial: city,
              shuffle: true,
              transform: function(city) {
                return city.name;
              }
            })
          };
        }
      }));
    }
  });
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
