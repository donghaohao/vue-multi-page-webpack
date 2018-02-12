const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const app = express();
const config = require('./webpack.dev.config.js')
const compiler = webpack(config)

const devMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false,
    children: false,
  },
  lazy: false,
  publicPath: '/',
})

app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

app.listen(3000, function () {
  console.log('Modules listening on port 3000!\n')
})
