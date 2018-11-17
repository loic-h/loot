const path = require("path");

const rootPath = path.join(__dirname, '../');

const config = {};

config.PROTOCOL = 'http';
config.HOST = 'localhost';
config.PORT = 8080;
config.MONGO_URI = 'mongodb://localhost/loot';
config.APP_NAME = 'Loot';


config.path = {};
config.path.static = path.join(rootPath, 'static/');
config.path.thumbs = path.join(config.path.static, 'thumbs/');
config.path.files = path.join(rootPath, 'files/');

// [width, height, crop(bool), stretch(bool)]
config.imagesizes = {
	desktop: {width: 750}
};


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
