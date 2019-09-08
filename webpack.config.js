const path = require('path');

const webpack = require('webpack');
const config = require('@ionic/app-scripts/config/webpack.config.js');

config.prod.plugins.push(new webpack.NormalModuleReplacementPlugin(
  /util\/environment/,
  path.resolve('./src/app/util/environment.prod.ts')
));

module.exports = config;
