const path = require('path');

const context = path.resolve(__dirname, '..');

module.exports = {
  context,
  entry: `${context}/src/app.js`,
  output: {
    path: `${context}/static`,
    filename: 'app.js'
  }
};
