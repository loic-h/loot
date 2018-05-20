const express = require('express');
const config = require('../config');

const app = express();

app.get('/', (req, res) => {
  res.send('Loot app');
});

app.listen(config.PORT, () => {
  console.log(`Loot App listening on ${config.PORT}`);
})

module.exports = app;
