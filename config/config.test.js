const config = require('./config.global');

config.PORT = 8081;
config.MONGO_URI = 'mongodb://localhost/loot-test';
config.BASE = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;

module.exports = config;
