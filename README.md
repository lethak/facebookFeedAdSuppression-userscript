
# facebookFeedAdSuppression Userscript

This userscript is trying to improve the user experience on facebook.com by removing ads.

## Features

* Automatically suppress covert advertisement masquerading as legitimate 'Sponsored' stories on your Facebook feed.

## Installation

### Disclaimer

For experimental private and personal use, without any warranty whatsoever.


### First time
Load the [userscript](https://github.com/lethak/facebookFeedAdSuppression-userscript/raw/master/facebookFeedAdSuppression.user.js) with the recommended __tampermonkey__ browser extension
* [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [Tampermonkey for Firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/).

For using greasemonkey over tampermonkey, please read the [troubleshooting](./doc/troubleshooting.md) section. 

Direct link to the userscript: https://github.com/lethak/facebookFeedAdSuppression-userscript/raw/master/facebookFeedAdSuppression.user.js


### Update

The userscript is setup to be auto-updated via metadata-block [[1]](https://wiki.greasespot.net/Metadata_Block)[[2]](https://tampermonkey.net/documentation.php#_updateURL).

Nothing to be done beside asking tampermonkey or greasemonkey to check for updates; or wait for/setup them to do it automatically.

### Ad Blockers

In any way, please consider using an ad-blocker for your safety.

* [uBlock Origin for Chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
* [uBlock Origin for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin)

## Versioning

Each public version of the script is released as a tag with the following format:

> YEAR.MONTH.build number for the month



# Developers

## Install

```bash
npm run install
```


## Build

For production:
```bash
npm run build
```


For dev/debug:
```bash
npm run build_dev
```

both are incrementing the build version
