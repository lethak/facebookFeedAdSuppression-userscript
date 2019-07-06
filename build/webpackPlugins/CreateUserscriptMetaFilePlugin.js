const userscriptMetaHelper = require('userscript-meta')

let CreateUserscriptMetaFilePlugin = (function () {
  const write = require('write')
  const path = require('path')

  function CreateUserscriptMetaFilePlugin (options) {
    if (options === void 0) {
      options = {}
    }
    this.options = options
  }

  CreateUserscriptMetaFilePlugin.prototype.apply = function (compiler) {
    const _this = this

    compiler.plugin('done', function () {
      const fullPath = path.join(_this.options.path, _this.options.fileName)
      write.sync(fullPath, userscriptMetaHelper.stringify(_this.options.content))
    })
  }

  return CreateUserscriptMetaFilePlugin
})()

module.exports = CreateUserscriptMetaFilePlugin
