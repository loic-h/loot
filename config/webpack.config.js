const path = require('path');

const context = path.resolve(__dirname, '..');

module.exports = {
  context,
  entry: `${context}/src/js/index.js`,
  output: {
    path: `${context}/static`,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js*/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }
    ]
  }
};
