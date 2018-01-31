const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  ROOT_PATH: ROOT_PATH,
  SRC_PATH: SRC_PATH,
  DIST_PATH: DIST_PATH,
  ASSETS_PATH: 'static/',
}
