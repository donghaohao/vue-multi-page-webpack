const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const POSTCSS_CONFIG = [
  require('postcss-import')(),
  require('postcss-cssnext')(),
  require('postcss-nested')(),
  require('postcss-px2rem')({ remUnit: 75 })
]

module.exports = {
  ROOT_PATH: ROOT_PATH,
  SRC_PATH: SRC_PATH,
  DIST_PATH: DIST_PATH,
  POSTCSS_CONFIG: POSTCSS_CONFIG,
  ASSETS_PATH: 'static/',
}
