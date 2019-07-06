const config = require('../config')

module.exports = {
  name: 'Lethak\'s Userscript for facebook.com (ad suppression)',
  namespace: config.build.userscriptNamespace,
  author: 'LethaK Maas',
  description: 'Userscript automatically removing Ads from your Facebook feed',
  include: [
    'https://www.facebook.com*'
  ],
  homepage: 'https://github.com/lethak/facebookFeedAdSuppression-userscript',
  downloadURL: 'https://raw.githubusercontent.com/lethak/facebookFeedAdSuppression-userscript/master/dist/' + config.build.userscriptNamespace + '.user.js',
  updateURL: 'https://raw.githubusercontent.com/lethak/facebookFeedAdSuppression-userscript/master/dist/' + config.build.userscriptNamespace + '.meta.js',
  icon: 'https://i.imgur.com/UAyItAe.png',
  grant: 'none',
  'run-at': 'document-end',
  version: '2019.0.0' // This will get overrided at build-time using config/version.js
}
