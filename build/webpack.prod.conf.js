var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
const WrapperPlugin = require('wrapper-webpack-plugin')
const userscriptMetaHelper = require('userscript-meta')
const metascript = require('../src/metascript')
metascript.version = require('../config/version').version
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var env = config.build.env


var webpackConfig = merge(baseWebpackConfig, {
  module: {
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJSPlugin({
      sourceMap: config.build.productionSourceMap,
      warningsFilter: false,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new WrapperPlugin({
      test: new RegExp(config.build.userscriptNamespace + '\\.user\\.js$'), // only wrap output of bundle files with '.js' extension
      header: function () {
        return userscriptMetaHelper.stringify(metascript)
      }
      // footer: ''
    }),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
