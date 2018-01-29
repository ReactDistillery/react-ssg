const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    vendor: [path.join(__dirname, 'src', 'vendor.js')],
  },

  output: {
    path: path.join(__dirname, '/'),
    filename: 'dll.[name].js',
    library: '[name]',
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '/', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, 'src'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
