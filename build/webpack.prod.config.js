const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const utils = require('./utils/util.js')
const consts = require('./config/consts')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
  plugins: moduleContent.plugins.concat([
    new CleanWebpackPlugin(['dist'], { root: consts.ROOT_PATH }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    // new UglifyJsPlugin({
    //   sourceMap: false,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor'],
    //   chunkFilename: '[name].[chunkhash:7].js',
    //   minChunks: 88
    // }),
  ]),
})
console.log(prodConfig.module.rules[4])

// console.log(prodConfig.entry)

module.exports = prodConfig
