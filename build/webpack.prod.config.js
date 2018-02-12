const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const utils = require('./utils/util.js')
const consts = require('./config/consts')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = 'production'

const moduleName = process.env.module
let moduleList = []
if (moduleName) {
  moduleList = moduleName.split(',')
} else {
  moduleList = utils.allModules
}

const configList = utils.loadModules(moduleList)
console.log('Build modules:', ...new Set(configList.map(item => item.entry.split('/')[0])))
const moduleContent = utils.getModuleConfigs(configList)

let prodConfig = merge(baseConfig, {
  entry: moduleContent.entry,
  output: {
    publicPath: consts.DIST_PATH + '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: utils.getCssLoaderConfig(true)
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: utils.getVueLoaderConfig(true)
      },
    ]
  },
  plugins: moduleContent.plugins.concat([
    new CleanWebpackPlugin(['dist'], { root: consts.ROOT_PATH }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      chunkFilename: '[name].[chunkhash:7].js',
      minChunks: 88
    }),
  ]),
})

// 输出最终的配置文件
// fs.writeFile('webpack.prod.config.json', JSON.stringify(prodConfig, null, 2), (err) => {
//   if (err) throw err
//   console.log('Dev config file generated')
// })
module.exports = prodConfig
