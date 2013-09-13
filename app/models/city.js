var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: String,
  position: [{ lat: Number, lng: Number, pov: Number }],
  region: { type: Schema.ObjectId, ref: 'Region' }
});

mongoose.model('City', CitySchema);
