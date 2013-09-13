var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegionSchema = new Schema({
  name: String
});

mongoose.model('Region', RegionSchema);
