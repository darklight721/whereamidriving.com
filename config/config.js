var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'whereamidriving'
    },
    port: 3000,
    db: 'mongodb://localhost/whereamidriving-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'whereamidriving'
    },
    port: 3000,
    db: 'mongodb://localhost/whereamidriving-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'whereamidriving'
    },
    port: 3000,
    db: 'mongodb://localhost/whereamidriving-production'
  }
};

module.exports = config[env];
