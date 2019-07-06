(function () {
  // Selectors and variables...

  const isDebugEnabled = process.env.CONSOLE_ENABLED
  // const sponsoredText = 'Sponsored' // @deprecated since users may have a different locale
  const storyCardSelector = `div[id^="hyperfeed_story_id_"]`
  const storyCardColorContainerSelector = `div:first-of-type`
  const storySubHeaderSelector = `div[id^="fbfeed__sub__header__id_"]`
  const storySubHeaderButtonSelector = `a[role="button"]:first-of-type`
  // const storySubHeaderButtonSpansSelector = `span > span > span`
  const storySubHeaderButtonSpansSelector = `span:first-of-type`
  const storySubHeaderButtonSpansTagName = `SPAN`

  const { getRandomInt, randomId } = require('./utils/random')

  // Loop stuff...

  const loopIntervalMs = 950
  let loopHandler = null
  const loopStop = function () {
    if (loopHandler) {
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

  // DOM utilities...
  const removeDomStoryCardElement = function (el) {
    executeInDebugMode(() => {
      console.warn('[AD SUPRESSION] now removing story element = ', el)
    })
    if (el && el.parentNode) {
      if (!isDebugEnabled) {
        el.parentNode.removeChild(el)
      } else {
        el.querySelectorAll(storyCardColorContainerSelector).forEach((cardColorContainer) => {
          cardColorContainer.style.backgroundColor = 'orange'
        })
      }
    }
  }
  const isDomElementPixelInvisible = function (el) {
    return (el.offsetWidth === 0 && el.offsetHeight === 0)
  }

  const extractDomObfuscatedText = function (containerElem, isRecursive = false) {
    const textArr = []
    const elem = containerElem.querySelector(storySubHeaderButtonSpansSelector)
    if (!elem || elem.tagName !== storySubHeaderButtonSpansTagName) {
      return ''
    }
    if (elem.childElementCount && !elem.innerText) {
      elem.children.forEach((childElem) => {
        textArr.push(extractDomObfuscatedText(childElem, isRecursive))
      })
    } else if (elem.innerText && !isDomElementPixelInvisible(elem)) {
      executeInDebugMode(() => {
        elem.style.backgroundColor = 'red'
      })
      textArr.push(`${elem.innerText}`)
    }
    const result = (`${textArr.join('')}`)

    executeInDebugMode(() => {
      elem.style.backgroundColor = 'red'
      if (!isRecursive) {
        console.debug(' extractDomObfuscatedText = ', result)
      }
    })
    return result
  }

  const isDomStorySubHeaderButtonSponsored = function (storySubHeaderBtnElem) {
    const text = extractDomObfuscatedText(storySubHeaderBtnElem)
    const matchNumeric = text.match(/[0-9]/ig)
    const matchSpace = text.match(/[ ]/ig)
    const hasNumericValues = !!(text !== '' && matchNumeric && matchNumeric.length)
    const hasSpaceValues = !!(text !== '' && matchSpace && matchSpace.length)
    const isSponsored = (text && !hasNumericValues && !hasSpaceValues)
    executeInDebugMode(() => {
      if (isSponsored) {
        console.warn('[AD SUPRESSION] Visible text without numeric nor space value = ', text)
      }
    })
    return isSponsored
  }

  const removeAdds = function () {
    document.querySelectorAll(`${storyCardSelector}:not(.${randomStoryCardProcessedCssClass})`).forEach((storyCardEl) => {
      // document.querySelectorAll(`${storyCardSelector}`).forEach((storyCardEl) => {
      executeInDebugMode(() => {
        storyCardEl.querySelectorAll(storyCardColorContainerSelector).forEach((cardColorContainer) => {
          cardColorContainer.style.backgroundColor = 'rgb(150, 150, 150)'
        })
      })
      storyCardEl.querySelectorAll(storySubHeaderSelector).forEach((storySubHeaderEl) => {
        executeInDebugMode(() => {
          storySubHeaderEl.style.backgroundColor = 'purple'
        })
        storySubHeaderEl.querySelectorAll(storySubHeaderButtonSelector).forEach((btnEl) => {
          executeInDebugMode(() => {
            btnEl.style.backgroundColor = 'cyan'
          })
          const isSponsored = isDomStorySubHeaderButtonSponsored(btnEl)
          if (isSponsored) {
            storyCardEl.classList.add(randomStoryCardProcessedCssClass)
            removeDomStoryCardElement(storyCardEl)
          }
        })
      })
    })
  }

  // EXEC ...
  loopStop()
  const randomStoryCardProcessedCssClass = randomId(getRandomInt(10, 30))
  executeInDebugMode(() => {
    console.warn('==== randomStoryCardProcessedCssClass ===== ', randomStoryCardProcessedCssClass)
  })
  loopHandler = setInterval(() => {
    try {
      removeAdds()
    } catch (err) {
      console.error('[AD SUPRESSION ERROR] : ', err.message, ' --- ', err)
    }
  }, loopIntervalMs)
})()
