var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');
var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/
 //loader: WebpackStripLoader.loader('console.log')  // TODO We want load this module if gonna build our lib for production env
}
devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;
