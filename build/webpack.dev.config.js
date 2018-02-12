const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const utils = require('./utils/util.js')
const consts = require('./config/consts')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: utils.getCssLoaderConfig()
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: utils.getVueLoaderConfig()
      },
    ]
  },
  plugins: moduleContent.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: '[name].[hash:7].js',
      minChunks: 88
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]),
  devtool: '#eval-source-map',
})


fs.writeFile('webpack.prod.config.json', JSON.stringify(prodConfig, null, 2), (err) => {
  if (err) throw err
  console.log('Dev config file generated')
})

module.exports = prodConfig
