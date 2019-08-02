// ==UserScript==
// @name Lethak's Userscript for facebook.com (ad suppression)
// @namespace facebookFeedAdSuppression
// @author LethaK Maas
// @description Userscript automatically removing Ads from your Facebook feed
// @include https://www.facebook.com*
// @homepage https://github.com/lethak/facebookFeedAdSuppression-userscript
// @downloadURL https://raw.githubusercontent.com/lethak/facebookFeedAdSuppression-userscript/master/dist/facebookFeedAdSuppression.user.js
// @updateURL https://raw.githubusercontent.com/lethak/facebookFeedAdSuppression-userscript/master/dist/facebookFeedAdSuppression.meta.js
// @icon https://i.imgur.com/UAyItAe.png
// @grant none
// @run-at document-end
// @version 2019.8.10
// ==/UserScript==
!function(t){var n={};function o(r){if(n[r])return n[r].exports;var e=n[r]={i:r,l:!1,exports:{}};return t[r].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=n,o.i=function(t){return t},o.d=function(t,n,r){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="/",o(o.s=2)}([function(t,n,o){function r(t,n){if(t!==n)throw new TypeError("Cannot instantiate an arrow function")}!function(){var t=this,n=o(3),e=n.getRandomInt,i=n.randomId,c=null,s=function(t){var n=this,o=function t(n){var o,e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],c=[],s=n.querySelector("span:first-of-type");if(!s||"SPAN"!==s.tagName)return"";s.childElementCount&&!s.innerText?s.children.forEach(function(n){r(this,e),c.push(t(n,i))}.bind(this)):s.innerText&&(0!==(o=s).offsetWidth||0!==o.offsetHeight)&&(function(){r(this,e),s.style.backgroundColor="red"}.bind(this),c.push(""+String(s.innerText)));var u=""+String(c.join(""));return function(){r(this,e),s.style.backgroundColor="red",i||console.debug(" extractDomObfuscatedText = ",u)}.bind(this),u}(t),e=o.match(/[0-9]/gi),i=o.match(/\s/gi),c=!(""===o||!e||!e.length),s=!(""===o||!i||!i.length),u=o&&!c&&!s;return function(){r(this,n),u&&console.warn("[AD SUPRESSION] Visible text without numeric nor space value = ",o)}.bind(this),u},u=function(){var t=this;document.querySelectorAll('div[id^="hyperfeed_story_id_"]:not(.'+String(a)+")").forEach(function(n){r(this,t),function(){r(this,t),n.querySelectorAll("div:first-of-type").forEach(function(n){r(this,t),n.style.backgroundColor="rgb(150, 150, 150)"}.bind(this))}.bind(this),n.querySelectorAll('div[id^="fbfeed__sub__header__id_"]').forEach(function(o){r(this,t),function(){r(this,t),o.style.backgroundColor="purple"}.bind(this),o.querySelectorAll('a[role="button"]:first-of-type').forEach(function(o){r(this,t),function(){r(this,t),o.style.backgroundColor="cyan"}.bind(this),s(o)&&(n.classList.add(a),function(t){var n=this;(function(){r(this,n),console.warn("[AD SUPRESSION] now removing story element = ",t)}).bind(this),t&&t.parentNode&&t.parentNode.removeChild(t)}(n))}.bind(this))}.bind(this))}.bind(this))};c&&(clearInterval(c),c=null);var a=i(e(10,30));(function(){r(this,t),console.warn("==== randomStoryCardProcessedCssClass ===== ",a)}).bind(this),c=setInterval(function(){r(this,t);try{u()}catch(t){console.error("[AD SUPRESSION ERROR] : ",t.message," --- ",t)}}.bind(this),950)}()},function(t,n){if(void 0===o&&void 0!==window)var o=window;void 0===o.browser&&void 0!==o.chrome&&(o.browser=o.chrome)},function(t,n,o){o(1),o(0)},function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),o.d(n,"randomId",function(){return r}),o.d(n,"getRandomInt",function(){return e});var r=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",r=o.length,e=0;e<t;e++)n+=o.charAt(Math.floor(Math.random()*r));return n},e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return t=Math.ceil(t),n=Math.floor(n),Math.floor(Math.random()*(n-t+1))+t}}]);