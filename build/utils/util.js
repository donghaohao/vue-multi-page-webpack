const fs = require('fs')
const path = require('path')
const consts = require('../config/consts.js')
const yaml = require('js-yaml')
const process = require('process')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getHtmlTemplatePlugin = config => {
  return new HtmlWebpackPlugin({
    filename: `${config.entry}/index.html`,
    template: path.join(consts.ROOT_PATH, 'build/index.html'),
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   minifyCSS: true,
    //   minifyJS: true,
    //   collapseBooleanAttributes: true,
    // },
    // chunks: ['vendor'],
    inject: 'body',
    chunks: ['vendor', config.chunkName]
  })
}

module.exports = {
  get allModules() {
    return fs.readdirSync(consts.SRC_PATH)
  },
  loadModules: function(moduleList) {
    let entryLists = []
    moduleList.forEach(item => {
      let configPath = path.resolve(consts.SRC_PATH, item + '/config.yml')
      if (fs.existsSync(configPath)) {
        let config
        let file = fs.readFileSync(configPath, 'utf8')
        try {
          config = yaml.safeLoad(file)
          entryLists = entryLists.concat(config)
        } catch (error) {
          process.exit(`Invalid module config: ${item}`)
        }
      }
    })
    return entryLists
  },
  getModuleConfigs: function(entryLists) {
    let entryConfigs = entryLists.map(item => {
      let entry = item.entry
      let temp = entry.split('/')
      return {
        chunkName: entry + '/' + (temp.length > 1 ? temp.pop() : entry),
        src: [`./src/${entry}`],
        entry: entry,
      }
    })
    let entries = {}
    let plugins = []
    console.log('============')
    entryConfigs.forEach(item => {
      entries[item.chunkName] = item.src
      console.log(item.entry)
      console.log(item.chunkName)
      plugins.push(getHtmlTemplatePlugin(item))
    })

    return {
      entry: entries,
      plugins: plugins,
    }
  },
}
