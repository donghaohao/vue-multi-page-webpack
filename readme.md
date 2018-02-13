### webpack 配置 Vue 多页应用 —— 从入门到放弃

一直以来，前端享有无需配置，一个浏览器足矣的优势，直到一大堆构建工具的出现，其中 webpack 就是其中最复杂的一个，因此出现了一个新兴职业 『webpack 配置工程师』。其实 webpack 配置本质上来说也就是编程，难点在于各种 loader 和 plugin 的选择和合理搭配，下面就由我来捋一捋。

使用 webpack 配置单页应用的教程很多，直接使用官方的 vue-cli 工具就非常方便，今天我要说的是如何配置一个多页应用，这如果会了，单页应用也当然不在话下。

先放下项目地址项目地址 [vue-multi-page-webpack](https://github.com/donghaohao/vue-multi-page-webpack)

逼不多装，先说下要达成的效果。假设我们有两个目录

```
|-- page1
|-- page2
    |-- page3

```
要做到
- 每个页面都有自己的配置项，包括但不仅限于 title、脚本等
- 可以打包所有目录及其子目录
- 可以做到只开发或打包指定目录（例如目录很多，我们只想要开发其中一个页面）
- 余下的就是一些基本的配置项了，这些单页面配置也有，如 eslint、babel、postcss 等等

让我们愉快的开始吧！注意：一些很基础的配置我就不提了，可以在我的 github 上看完整配置项

按照惯例，配置分为开发和生产的配置，可以分为 `webpack.base.config.js` `webpack.dev.config.js` `webpack.prod.config.js`

先从`webpack.base.config.js`说起

```js
entry: {
  vendor: ['vue'],
},
output: {
  path: consts.DIST_PATH,
  filename: '[name].[chunkhash:7].js',
  publicPath: '/'
},
```
因为每个页面都要用到 vue，因此把它放到 vendor 里，这里入口还不急配置入口文件，因为上面我们说过要实现按需开发和打包，因此这里是动态配置的，后面会说到。output 里都是常规配置，可以把一些常量单独提取出来。

接下来配置 loader，用 eslint-loader 举例说明
```js
{
  enforce: 'pre',
  test: /\.(js|vue)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
  }
}
```
loader 配置大同小异，一般就是其中的 `test` 和 `loader` 值不同，`enforce: 'pre'`表示在其它 loader 之前执行，`test` 表示对哪种类型的文件转换，`loader` 表示使用的 `loader`，对于每种 loader 来说最好去相应的官方文档上去看看用法。这里说下我用到的。

eslint-loader 进行代码检查的，在根目录下配置一下 eslintrc ，因为是 vue 项目，所以 plugin 增加 vue，这需要引入 eslint-plugin-vue，然后 env 设置 `es6: true` 开启 ES6，需要注意的是最新版本可能有坑，如果你用的以前的 eslint 配置，可能会报错，可以看看 [这个](https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error)，不要问我为什么知道... 其它配置可参考我的。

babel-loader json-loader vue-html-loader 处理对应类型的文件，没什么好说的。

值得注意的是对于图片的处理，这里使用了 file-loader，要注意 outputPath 的配置，很容易导致图片404。

对于 css 和 vue 文件，配置有些不同，稍后再说。

接下来就是重点 `webpack.dev.config.js` ，之前说过要按需开发，首先科普下一个小知识。我们创建 test.js
```js
// test.js
console.log(process.env.a)

a=b node test.js // 输出b
```
之前的 `a=b` 会被写入环境变量中，通过 `process.env` 可以得到，通过这样就可以实现按需开发。

以前都是直接运行 webpack 命令带上 开发环境的配置文件使用自带的 server 来开发和热更新，这对于带参数按需开发不现实，这里使用 express 和 webpack-dev-middleware 加 webpack-hot-middleware 来达到目的，其实配置差不多。创建一个 server.js

```js
server.js
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
```
我们使用 `module=page1 node server.js` 启动，这时 page1 就是环境变量 module 的值。

在 `webpack.dev.config.js` 配置中，
```js
const moduleName = process.env.module
let moduleList = []
if (moduleName) {
  moduleList = moduleName.split(',')
} else {
  moduleList = utils.allModules
}
```
这样就可以得到需要开发的模块，可以看到其实也支持 `module=page1,page2` 这样的形式。

接着就需要将moduleList 中的每一项提取为入口文件
```js
const configList = utils.loadModules(moduleList)
const moduleContent = utils.getModuleConfigs(configList)
```
这里utils 的代码有点长，就不放在这了，可以在 GitHub 上看，主要说说是怎么做的。上面`moduleList = ['page1', 'page2']`，寻找 src 目录下的每一项，即我们要开发的目录，对于每个模块，可能有自己的 title 和 需要加载的脚本，因此在每个目录里需要一个配置文件，这里看下page1 的配置文件 `config.yml`
```
entry: 'page1'
template:
  title: 'page1'
  scripts:
    - 'https://unpkg.com/vue-router/dist/vue-router.min.js'
    - 'https://unpkg.com/vuex/dist/vuex.min.js'

```
这是一个 `.yml` 文件，当然你用 `.json` 文件什么的其实也可以，这里规定每个模块都需要有一个 `config.yml`。loadModules 方法把 `config.yml` 的配置读取出来，生成
```
[{
  entry: 'page1',
  template: {
    title: 'page1',
    scripts: ['script1', 'script2']
  }
}]
```
根据这个配置文件，再来生成之前提到的入口配置，`{ 'page1/page1': [ './src/page1' ] }` 即最后生成的是 page1 目录下的 page1.js，与此同时，为每一个目录生成一个 html 文件，这里使用了 `HtmlWebpackPlugin` 插件，上面的配置文件中有 title 和 scripts，可以传入 html 模板中生成相应的部分。

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>HELLO WORLD!</h1>
    <div id="app"></div>
    <!-- 如果有内嵌的js可以放在这里 -->
    <!-- <script defer></script> -->

    <!-- 通过参数插入的 script -->
    <% for (var i = 0; i < htmlWebpackPlugin.options.scripts.length; i++) { %>
    <script src=<%= htmlWebpackPlugin.options.scripts[i] %>></script>
    <% } %>
  </body>
</html>
```

使用 `HtmlWebpackPlugin` 插件时需要注意 template 即上面的模板，chunks 即打包成的 js 文件，vendor 是公用的，里面有 vue，放在最前面，后面就是每个页面自己的 js 文件，`inject: 'body'` 表示放在 body 前，当然你也可以添加自己想要的参数，按照上面模板的方式插进去。

```js
const getHtmlTemplatePlugin = config => {
  return new HtmlWebpackPlugin({
    filename: `${config.entry}/index.html`,
    template: path.join(consts.ROOT_PATH, 'build/index.tpl'),
    title: config.template.title,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true,
    },
    inject: 'body',
    chunks: ['vendor', config.chunkName],
    scripts: config.template.scripts || [],
  })
}
```
接着就是开发环境需要的 loader ，首先是 css 文件，这里使用了 postcss，为了方便在根目录添加 `.postcssrc` 文件，postcss-import 可以方便的用 import 命令引用 css 文件，postcss-cssnext 就是使用一些新的语法，postcss-nested 可以使用嵌套的语法，如果你是开发移动端，使用了 flexible.js，使用 postcss-px2rem 可以将 px 转成 rem，注意你必须在上面的模板文件中添加 flexible.js。

```js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-cssnext": {},
    "postcss-nested": {},
    "postcss-px2rem": { remUnit: 75 },
  }
}
```
这里把 css的配置封装一下，在生产环境中使用 `ExtractTextPlugin` 将css单独提取成文件，开发环境则不需要，**注意三个loader**的顺序

```js
getCssLoaderConfig: function(isProduction) {
  const config = [{
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1
    }
  }, {
    loader: 'postcss-loader',
  }]
  return isProduction ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: config,
  }) : [{ loader: 'style-loader '}].concat(config)
},
```
对于 vue 文件来说类似，这里就不放代码了。

接下来就是插件, CommonsChunkPlugin 就是把之前 入口的 vendor 单独打包，HotModuleReplacementPlugin 就是实现开发环境时热更新。
```js
new webpack.optimize.CommonsChunkPlugin({
  name: ['vendor'],
  filename: '[name].[hash:7].js',
  minChunks: 88
}),
new webpack.HotModuleReplacementPlugin(),
```
当然要实现热更新还是光有上面的插件还是不够的，需要给每个入口增加一个`webpack-hot-middleware/client?reload=true`，这里通过代码来增加
```js
Object.keys(moduleContent.entry).forEach(key => {
  if (Array.isArray(moduleContent.entry[key])) {
    moduleContent.entry[key].push('webpack-hot-middleware/client?reload=true')
  }
})
```
到此，你就可以开心的使用 `module=page1 node server.js` 来开发了 page1 模块了，是不是很简单。加入要开发所有模块，不带 `module=page1` 即可，因为有个可以读取 src 目录下的所有目录
```
get allModules() {
  return fs.readdirSync(consts.SRC_PATH)
}
```
还有一点要提一下的就是假如是嵌套的目录配置文件如下其实代码也是适用的，只要给每个子目录添加相应的配置文件即可

```
- entry: 'page2'
  template:
    title: 'page2'

- entry: 'page2/page3'
  template:
    title: 'page3'
    scripts:
      - 'https://unpkg.com/vue-router/dist/vue-router.min.js'
      - 'https://unpkg.com/vuex/dist/vuex.min.js'
```

最后再来说一说生产环境的，其实和开发环境大体类似。需要一个 build.js，这里比开发环境简单一点，只需运行配置就好。
```js
const ora = require('ora')
const webpack = require('webpack')
function runWebpack() {
  const webpackConf = require('./webpack.prod.config')
  const spinner = ora('building for production...').start()
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
```
生产环境配置有一点不同的是要指定output目录，一般可以是 CDN 或 服务器的目录，这里使用了 dist 目录，通过 CleanWebpackPlugin 插件可以在每次打包之前清除 dist 目录，UglifyJsPlugin 压缩 js 文件，ExtractTextPlugin 插件就是提取 css 为单独文件，即上面在使用`ExtractTextPlugin.extract` 时处理的css。最后为了调试方便，可以使用一段代码生成最后的配置文件。
```
fs.writeFile('webpack.prod.config.json', JSON.stringify(prodConfig, null, 2), (err) => {
  if (err) throw err
  console.log('Dev config file generated')
})
```
至此，配置基本结束，还有一点，用 `module=page1 node server.js` 这样的命令体现不出逼格，因此写个 makefile 文件，使命令简单点。
```
.PHONY: build
.PHONY: dev

dev:
	@sudo module=${module} node build/dev.js

build:
	@sudo module=${module} node build/build.js
```
当使用 `make dev` 即运行对应的命令，开发所有模块，`make dev module=page1` 即单独开发 page1，同理 `make build` 打包命令。其实make 命令是很强大的，可以更方便的执行多条命令，让自动化变得更简单，我也只会这一点毛皮。

在最后的一天工作日终于写完了，拖延症晚期患者。如果本文及这个小项目对你有用，点个赞呗。项目地址[vue-multi-page-webpack](https://github.com/donghaohao/vue-multi-page-webpack)。

溜了，溜了，赶火车肥家。大家春节愉快。
