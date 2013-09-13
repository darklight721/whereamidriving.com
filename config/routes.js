module.exports = function(app){

  var regions = require('../app/controllers/regions');
  app.get('/regions', regions.all);

  var engine = require('../app/controllers/engine');
  app.get('/generate', engine.generate);
  app.post('/check', engine.check);

};
