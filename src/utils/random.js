export const randomId = function (length = 10) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const getRandomInt = function (min = 0, max = 10) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.floor(Math.random() * (max - min + 1)) + min)
}
