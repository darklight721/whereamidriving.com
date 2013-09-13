var _ = require('underscore'),
    mongoose = require('mongoose'),
    City = mongoose.model('City');

function random(n) {
  return Math.floor(Math.random() * n);
}

function uniqueSet(options) {
  var list = options.list, listLength = list.length,
      set = {}, setLength = Math.min(options.length, listLength), setCounter = 0,
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
      res.json(uniqueSet({
        length: 12,
        list: cities,
        transform: function(city, index) {
          return {
            id: city._id,
            position: city.positions[random(city.positions.length)],
            choices: uniqueSet({
              length: index < 4 ? 2 : index < 8 ? 3 : 4,
              list: cities,
              initial: city,
              transform: function(city) {
                return city.name;
              },
              shuffle: true
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
