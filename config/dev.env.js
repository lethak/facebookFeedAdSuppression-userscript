var merge = require('webpack-merge')
var custom = {}

try {
  custom = require('./custom.env')
} catch (e) {
}


module.exports = merge({
  NODE_ENV: JSON.stringify('development'),
  AUTHOR: JSON.stringify('LethaK'),
  CONSOLE_ENABLED: true
}, custom)
