const config = {};

config.PORT = 8080;
config.MONGO_URI = 'mongodb://localhost/loot';
config.log4js = {
  appenders: {
    app: {
      type: 'file',
      filename: 'log/app.log'
    },
    errorFile: {
      type: 'file',
      filename: 'log/error.log'
    },
    console: {
      type: 'console'
    },
    error: {
      type: 'logLevelFilter',
      appender: 'errorFile',
      level: 'ERROR'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'error'],
      level: 'debug'
    }
  }
}

module.exports = config;
