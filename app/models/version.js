var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VersionSchema = new Schema({
  v: { type: Number, default: 1 }
});

VersionSchema.static('get', function(callback) {
  return this.findOne({}, 'v', callback);
});

mongoose.model('Version', VersionSchema);
