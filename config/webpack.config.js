const path = require('path');

const context = path.resolve(__dirname, '..');

module.exports = {
  context,
  entry: `${context}/src/js/app.js`,
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
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }
    ]
  }
};
