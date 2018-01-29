/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
})
  .listen(3000, '0.0.0.0', (error) => {
    if (error) console.error(error);
    console.log('Listening at http://0.0.0.0:3000/');
  });
