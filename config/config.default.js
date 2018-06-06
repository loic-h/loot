const config = require('./config.global');

config.PROTOCOL = 'http';
config.HOST = 'localhost';
config.PORT = 8080;
config.MONGO_URI = 'mongodb://localhost/loot';
config.APP_NAME = 'Loot';

module.exports = config;
