// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var merge = require('webpack-merge')

let commonConfig = {
  sourceRoot: path.resolve(__dirname, '../src'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: '',
  assetsDocSubDirectory: '/images',
  assetsImagesSubDirectory: '/images',
  assetsPublicPath: '/',
  userscriptNamespace: 'facebookFeedAdSuppression',
}

let commonBuildConfig = {
  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report
}

// Build (prod)

let build = {}
build = merge(build, commonConfig)
build = merge(build, commonBuildConfig)
build = merge(build, {
  env: require('./prod.env')
})

// Build (dev)
let build_dev = {}
build_dev = merge(build_dev, commonConfig)
build_dev = merge(build_dev, commonBuildConfig)
build_dev = merge(build_dev, {
  env: require('./dev.env'),
  productionSourceMap: true
})

// run dev (hot loading)
let dev = {}
dev = merge(dev, commonConfig)
dev = merge(dev, {
  env: require('./dev.env'),
  port: 8080,
  autoOpenBrowser: true,
  proxyTable: {},
  cssSourceMap: false
})

// Exports
module.exports = {
  build: build,
  build_dev: build_dev,
  dev: dev
}
