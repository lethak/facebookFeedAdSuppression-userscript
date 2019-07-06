var path = require('path')
var utils = require('./utils')
var config = require('../config')
var CreateUserscriptMetaFilePlugin = require('./webpackPlugins/CreateUserscriptMetaFilePlugin')
var metascript = require('../src/metascript')
const versionObj = require('../config/version')
metascript.version = versionObj.version
const WrapperPlugin = require('wrapper-webpack-plugin')
const userscriptMetaHelper = require('userscript-meta')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    'facebookFeedAdSuppression.user': './src/userscript.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CreateUserscriptMetaFilePlugin({
      // path to folder in which the file will be created
      path: config.build.assetsRoot,
      fileName: 'facebookFeedAdSuppression.meta.js',
      content: metascript
    }),
    new WrapperPlugin({
      test: new RegExp(config.build.userscriptNamespace + '\\.user\\.js$'), // only wrap output of bundle files with '.js' extension
      header: function () {
        return userscriptMetaHelper.stringify(metascript)
      }
      // footer: ''
    })
  ]
}
