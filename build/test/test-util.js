const util = require('../utils/util')
const fs = require('fs')
const path = require('path')

console.log(util.allModules)
console.log(util.loadModules(util.allModules))
