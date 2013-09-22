var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: String,
  positions: [{ lat: Number, lng: Number, pov: Number }],
  region: { type: Schema.ObjectId, ref: 'Region', index: true },
  stats: { type: Number, default: 0 }
});

mongoose.model('City', CitySchema);
