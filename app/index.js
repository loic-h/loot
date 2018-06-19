const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const config = require('../config');

const routeApi = require('./routes/api');
const routeFront = require('./routes/front');

const app = express();
const logger = log4js.getLogger('app');

const baseURL = config.BASE || `${config.PROTOCOL}://${config.HOST}:${config.POST}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routeApi);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get(routeFront, (req, res) => {
  res.render('index', {
    name: config.APP_NAME,
    baseURL
  });
});

app.use('/static', express.static(path.join(__dirname, '../static')));

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', err => logger.error('Mongo err: ' + err));
mongoose.connection.once('open', () => logger.debug(`DB connected on ${config.MONGO_URI}`));

app.listen(config.PORT, () => {
  logger.debug(`Loot App listening on ${config.PORT}`);
});

process.on('SIGINT', () => {
  logger.debug('Process exiting. Good Bye!');
  process.exit();
});

module.exports = app;
