'use strict';
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');

module.exports = {
  entry: {
    'polyfill': './src/polyfill.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts',
  },

  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfill'], minChunks: Infinity }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      comments: false
    }),
    new CopyWebpackPlugin([
      { from: 'src/favicon.ico' },
      { from: 'src/index.html' }
    ])
  ],

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts'] },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  devtool: 'source-map'
};
