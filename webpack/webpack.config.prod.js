/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const packageJSON = require('../package.json');

const SUBFOLDER = 'js';

const nodeModules = fs.readdirSync(path.join(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, key) => Object.assign(acc, { [key]: `commonjs ${key}` }), {});

const config = server => ({
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src', (server ? 'server.jsx' : 'client.jsx')),
    ],
  },

  output: {
    path: path.join(__dirname, 'build', (server ? 'static' : 'public'), SUBFOLDER),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    publicPath: `${process.env.PUBLIC_PATH}${SUBFOLDER}/`,
    libraryTarget: (server ? 'commonjs2' : 'var'),
  },

  externals: (server ? nodeModules : {}),

  ...(server ? { target: 'node' } : {}),

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/],
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});

module.exports = [config(true), config(false)];
