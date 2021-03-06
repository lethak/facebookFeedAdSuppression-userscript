(function () {
  // Selectors and variables...

  const isDebugEnabled = process.env.CONSOLE_ENABLED
  // const sponsoredText = 'Sponsored' // @deprecated since users may have a different locale
  const storyCardSelector = `div[id^="hyperfeed_story_id_"]`
  const storyCardColorContainerSelector = `div:first-of-type`
  const storySubHeaderSelector = `div[id^="fbfeed__sub__header__id_"]`
  const storySubHeaderButtonSelector = `a[role="button"]:first-of-type, a[rel="theater"][ajaxify]:first-of-type, a[href^="/events/"], a[data-video-channel-id]`
  // const storySubHeaderButtonSpansSelector = `span > span > span`
  const storySubHeaderButtonSpansSelector = `span:first-of-type, span[class^="timestampContent"]`
  const storySubHeaderButtonSpansTagName = `SPAN`

  const { getRandomInt, randomId } = require('./utils/random')

  // Loop stuff...

  const loopIntervalMs = 450
  let loopHandler = null
  const loopStop = function () {
    this.loopCreatedAt = 0
    if (loopHandler) {
      executeInDebugMode(() => {
        console.debug('[AD SUPRESSION] loopStop ... ')
      })
      clearInterval(loopHandler)
      loopHandler = null
    }
  }

  // General utilities...
  const executeInDebugMode = function (func) {
    if (isDebugEnabled) {
      return (func)()
    }
    return null
  }

  const getRandomRgb = function () {
    return 'rgb(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ')'
  }

  // DOM utilities...
  const removeDomStoryCardElement = function (el) {
    executeInDebugMode(() => {
      console.warn('[AD SUPRESSION] now removing story element = ', el)
    })
    if (el && el.parentNode) {
      // const parentContainer = el.closest('*[role="feed"]')
      if (!isDebugEnabled) {
        el.parentNode.removeChild(el)
      } else {
        for (const cardColorContainer of el.parentNode.querySelectorAll(storyCardColorContainerSelector)) {
          cardColorContainer.style.backgroundColor = 'orange'
        }
      }
    }
  }
  const isDomElementPixelInvisible = function (el) {
    return (el.offsetWidth === 0 && el.offsetHeight === 0)
  }

  /**
   * @param elem
   * @return {string}
   */
  const getSimpleText = function (elem) {
    let result = ''
    if (elem !== null) {
      if (elem.getAttribute('data-content') !== null) {
        result = elem.getAttribute('data-content')
      } else if (elem.innerText) {
        result = elem.innerText
      }
    }
    return `${result}`
  }

  /**
   * @param containerElem
   * @param isRecursive
   * @return {string}
   */
  const extractDomObfuscatedText = function (containerElem, isRecursive = false) {
    const textArr = []
    const elem = containerElem.querySelector(storySubHeaderButtonSpansSelector)
    if (!elem /* || elem.tagName !== storySubHeaderButtonSpansTagName */) {
      return ''
    }

    if (!isRecursive && elem.childElementCount === 0 && elem.tagName === 'A') {
      executeInDebugMode(() => {
        console.debug(' ======== extractDomObfuscatedText SOLO ======== ', elem)
        elem.style.backgroundColor = 'red'
      })
      return getSimpleText(elem)
    }

    const elemText = getSimpleText(elem)
    if (elem.childElementCount && !elemText) {
      // console.debug('========== elem.children =========== ', elem.children)
      for (const childElem of elem.children) {
        if (childElem !== null) {
          executeInDebugMode(() => {
            childElem.style.backgroundColor = getRandomRgb()
          })
          textArr.push(extractDomObfuscatedText(childElem, true))
        }
      }
    } else if (elemText !== '' && !isDomElementPixelInvisible(elem)) {
      // executeInDebugMode(() => {
      //   elem.style.backgroundColor = 'red'
      // })
      textArr.push(elemText)
    }
    const result = (`${textArr.join('')}`)

    executeInDebugMode(() => {
      // elem.style.backgroundColor = 'red'
      if (!isRecursive) {
        console.debug(' extractDomObfuscatedText = ', result)
      }
    })
    return result
  }

  const isDomStorySubHeaderButtonSponsored = function (storySubHeaderBtnElem) {
    const text = extractDomObfuscatedText(storySubHeaderBtnElem, false)
    const matchNumeric = text.match(/[0-9]/ig)
    const matchSpace = text.match(/\s/ig)
    const hasNumericValues = !!(text !== '' && matchNumeric && matchNumeric.length)
    const hasSpaceValues = !!(text !== '' && matchSpace && matchSpace.length)
    const isSponsored = (text && !hasNumericValues && !hasSpaceValues && text.length > 1)
    executeInDebugMode(() => {
      if (isSponsored) {
        console.warn('[AD SUPRESSION] Visible text without numeric nor space value = ', text)
      }
    })
    return isSponsored
  }

  const removeAdds = function () {
    try {
      for (const storyCardEl of document.querySelectorAll(`${storyCardSelector}:not(.${randomStoryCardProcessedCssClass})`)) {
        // document.querySelectorAll(`${storyCardSelector}`).forEach((storyCardEl) => {
        executeInDebugMode(() => {
          for (const cardColorContainer of storyCardEl.querySelectorAll(storyCardColorContainerSelector)) {
            cardColorContainer.style.backgroundColor = 'rgb(150, 150, 150)'
          }
        })
        for (const storySubHeaderEl of storyCardEl.querySelectorAll(storySubHeaderSelector)) {
          executeInDebugMode(() => {
            storySubHeaderEl.style.backgroundColor = 'purple'
          })
          // const btnElements = [storySubHeaderEl.querySelector(storySubHeaderButtonSelector)]
          const btnElements = storySubHeaderEl.querySelectorAll(storySubHeaderButtonSelector)
          for (const btnEl of btnElements) {
            if (btnEl !== null) {
              executeInDebugMode(() => {
                btnEl.style.backgroundColor = 'cyan'
              })
              const isSponsored = isDomStorySubHeaderButtonSponsored(btnEl)
              if (isSponsored) {
                storyCardEl.classList.add(randomStoryCardProcessedCssClass)
                removeDomStoryCardElement(storyCardEl)
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('[AD SUPRESSION ERROR] : ', err.message, ' --- ', err)
    }
  }

  this.loopStart = () => {
    const nowTs = (new Date()).getTime()
    // If loop was created less than 1500 ms ago...
    if (nowTs - this.loopCreatedAt < 1500) {
      return null
    }
    loopStop()
    executeInDebugMode(() => {
      console.debug('[AD SUPRESSION] loopStart ... ')
    })
    this.loopCreatedAt = nowTs
    loopHandler = setInterval(() => {
      executeInDebugMode(() => {
        console.debug('[AD SUPRESSION]  Loop tick !')
      })
      removeAdds()
    }, loopIntervalMs)
  }
  // EXEC ...
  loopStop()
  const randomStoryCardProcessedCssClass = randomId(getRandomInt(10, 30))
  executeInDebugMode(() => {
    console.warn('==== randomStoryCardProcessedCssClass ===== ', randomStoryCardProcessedCssClass)
  })
  // Because FB clears all timeouts on each click...
  window.addEventListener('scroll', (e) => {
    executeInDebugMode(() => {
      console.debug('- window scrolled -', e)
    })
    this.loopStart()
  })
  this.loopStart()
})()
