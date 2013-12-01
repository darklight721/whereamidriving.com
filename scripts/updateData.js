if (process.argv.length < 3) {
  console.log('Missing parameter!');
  process.exit(1);
}

var _ = require('underscore'),
    fs = require('fs'),
    // get version
    configFileName = __dirname + '/../public/config.json',
    config = JSON.parse(fs.readFileSync(configFileName, 'utf8'));
    // get data
    dataFileName = __dirname + '/../public/data.json',
    data = JSON.parse(fs.readFileSync(dataFileName, 'utf8')),
    // get input data
    textFileName = process.argv[2],
    text = fs.readFileSync(textFileName, 'utf8'),
    lines = text.split('\n');
    // for parsers
    currentRegion = '',
    currentCity = '',
    parsers = [
      {
        rx: /!2d(-?\d+\.?\d*)!3d(-?\d+\.?\d*)!2m2!1f(-?\d+\.?\d*)/,
        exec: function(line) {
          var matches = this.rx.exec(line);
          if (!matches || matches.length !== 4) return false;
          var region = _.findWhere(data, { region: currentRegion });
          if (!region) {
            region = { region: currentRegion, cities: [] };
            data.push(region);
          }
          var city = _.findWhere(region.cities, { name: currentCity });
          if (!city) {
            city = { name: currentCity, positions: [] };
            region.cities.push(city);
          }
          city.positions.push({ lng: matches[1], lat: matches[2], pov: matches[3] });
          return true;
        }
      },
      {
        rx: /city:\s*(\w.*\w)/i,
        exec: function(line) {
          var matches = this.rx.exec(line);
          if (!matches || matches.length !== 2) return false;
          currentCity = matches[1];
          return true;
        }
      },
      {
        rx: /region:\s*(\w.*\w)/i,
        exec: function(line) {
          var matches = this.rx.exec(line);
          if (!matches || matches.length !== 2) return false;
          currentRegion = matches[1];
          return true;
        }
      }
    ];

// parse input data
lines.forEach(function(line) {
  _.find(parsers, function(parser) {
    return parser.exec(line);
  });
});

// update version
config.version = (parseFloat(config.version) + 1).toFixed(2).toString();

fs.writeFileSync(dataFileName, JSON.stringify(data));
fs.writeFileSync(configFileName, JSON.stringify(config));
console.log('Done!');
process.exit(0);
