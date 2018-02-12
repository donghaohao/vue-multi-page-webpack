const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const consts = require('./config/consts')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

let baseConfig = {
  entry: {
    vendor: ['vue'],
  },
  output: {
    path: consts.DIST_PATH,
    filename: '[name].[chunkhash:7].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.vue'],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
        }
      },
      {
        test: /\.js$/,
        include: consts.ROOT_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },  {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.html$/,
        loader: 'vue-html-loader?minimize=false',
      }, {
        test: /\.(svg|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static/', '[name].[hash:7].[ext]'),
        },
      }
    ]
  },
  plugins: [],
}

module.exports = baseConfig
