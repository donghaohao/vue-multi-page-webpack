const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const consts = require('./config/consts')
const svgoConfig = require('./config/svgo-config')

let baseConfig = {
  entry: {
    vendor: ['vue'],
  },
  output: {
    path: consts.DIST_PATH,
    filename: '[name].[chunkhash:7].js',
    publicPath: consts.DIST_PATH,
  },

  resolve: {
    extensions: ['.js', '.vue'],
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitWarning: true,
      //   }
      // },
      // {
      //   enforce: 'pre',
      //   test: /.svg$/,
      //   loader: 'svg-loader',
      //   options: {
      //     plugins: require('./config/svgo-config')
      //   },
      // }, {
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
          name: path.posix.join('/static/', '[name].[hash:7].[ext]'),
        },
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
          }
        ]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            style: 'vue-style-loader!css-loader'
          },
        }
      },
    ]
  },
  plugins: [],
}

module.exports = baseConfig
