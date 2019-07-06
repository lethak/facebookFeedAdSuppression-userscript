if (global === undefined && window !== undefined) {
  /* eslint-disable no-global-assign */
  var global = window
}

if (global.browser === undefined && global.chrome !== undefined) {
  global.browser = global.chrome
}
