const config = require('./config.global');

config.PORT = 8081;
config.MONGO_URI = 'mongodb://localhost/loot-test';

module.exports = config;
