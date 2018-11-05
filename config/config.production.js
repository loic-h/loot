const config = require('./config.global');

config.HOST = 'loot.loiic.com';
config.BASE = `${config.PROTOCOL}://${config.HOST}`;

module.exports = config;
