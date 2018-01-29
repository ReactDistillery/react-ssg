/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const vendorManifest = require('../ssg/vendor-manifest.json');
const packageJSON = require('../package.json');

const config = {
  cache: true,

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/client.jsx',
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: process.env.PUBLIC_PATH,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [path.join(__dirname, 'src')],
        loader: ['react-hot-loader/webpack', 'babel-loader'],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'src'),
      manifest: vendorManifest,
    }),
  ],
};

module.exports = config;
