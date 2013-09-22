var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatsSchema = new Schema({
  count: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
});

StatsSchema.method('average', function() {
  return this.count ? this.total / this.count : 0;
});

StatsSchema.static('get', function(callback) {
  return this.findOne({}, callback);
})

mongoose.model('Stats', StatsSchema);
