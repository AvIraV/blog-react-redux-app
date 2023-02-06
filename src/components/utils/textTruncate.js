export const textTruncate = (text, value) => {
  if (text === '' || text === null || text === undefined) {
    return null
  }
  const valueToCut = value
  let wordsArray = text.split(' ')
  let cutted = ''
  if (wordsArray[0].length > 50) {
    return wordsArray[0].slice(0, 20) + '...'
  }
  for (let i = 0; i < valueToCut; i++) {
    if (wordsArray[i] === undefined) {
      break
    }
    if (i === valueToCut - 1) {
      cutted += wordsArray[i] + '...'
      break
    }
    cutted += wordsArray[i] + ' '
  }

  return cutted
}
