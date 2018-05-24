const express = require('express');
const mongoose = require('mongoose');
const log4js = require('log4js');
const bodyParser = require('body-parser')
const config = require('../config');

const routeApi = require('./routes/api');

const app = express();
const logger = log4js.getLogger('app');

app.use(bodyParser.json());
app.use('/api', routeApi);

app.get('/', (req, res) => {
  res.redirect('/loots');
});

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', err => logger.error('Mongo err: ' + err));
mongoose.connection.once('open', () => logger.debug(`DB connected on ${config.MONGO_URI}`));

app.listen(config.PORT, () => {
  logger.debug(`Loot App listening on ${config.PORT}`);
})

module.exports = app;
