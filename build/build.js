const ora = require('ora')
const webpack = require('webpack')


function runWebpack() {
  const webpackConf = require('./webpack.prod.config')
  const spinner = ora('building for production...').start()
  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  //   webpackConf.plugins.push(new BundleAnalyzerPlugin({
  //     generateStatsFile: true,
  //   }))
  webpack(webpackConf, (err, stats) => {
    spinner.stop()
    if (err) throw err
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }))
  })
}

runWebpack()
