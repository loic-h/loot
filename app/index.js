const express = require('express');
const mongoose = require('mongoose');
const log4js = require('log4js');
const config = require('../config');

const app = express();
const logger = log4js.getLogger('app');

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', err => logger.error('Mongo err: ' + err));
mongoose.connection.once('open', () => logger.debug(`DB connected on ${config.MONGO_URI}`));

app.get('/', (req, res) => {
  res.send('Loot app');
});

app.listen(config.PORT, () => {
  logger.debug(`Loot App listening on ${config.PORT}`);
})

module.exports = app;
