const express = require('express');
const log4js = require('log4js');
const config = require('../config');

const app = express();
const logger = log4js.getLogger('app');

app.get('/', (req, res) => {
  res.send('Loot app');
});

app.listen(config.PORT, () => {
  logger.debug(`Loot App listening on ${config.PORT}`);
})

module.exports = app;
