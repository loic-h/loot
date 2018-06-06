const log4js = require('log4js');

const env = process.env.NODE_ENV || 'development';

const config = require(`./config.${env}`);

if (env !== 'test') {
  log4js.configure(config.log4js);
}

module.exports = config;
