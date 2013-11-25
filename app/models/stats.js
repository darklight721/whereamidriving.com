var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegionStatsSchema = new Schema({
  name: { type: String, index: true },
  total: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
}, { autoIndex: false });

var CityStatsSchema = new Schema({
  name: { type: String, index: true },
  region: { type: String, index: true },
  stats: { type: Number, default: 0 }
}, { autoIndex: false });

mongoose.model('RegionStats', RegionStatsSchema);
mongoose.model('CityStats', CityStatsSchema);
