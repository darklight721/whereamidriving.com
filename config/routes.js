module.exports = function(app){

  var stats = require('../app/controllers/stats');
  app.post('/submit_score', stats.submitScore);
  app.get('/stats', stats.get);

};
