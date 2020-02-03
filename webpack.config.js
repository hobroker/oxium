const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const { name } = require('./package');

module.exports = {
  // mode: process.env.NODE_ENV || 'development',
  entry: resolve('src'),
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    library: name,
    libraryTarget: 'umd',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
