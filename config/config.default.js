const config = require('./config.global');

config.PORT = 8080;
config.MONGO_URI = 'mongodb://localhost/loot';

module.exports = config;