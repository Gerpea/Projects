exports.convertToPigLatin = function (str) {
  const words = str.split(/\s+/)
  return words
    .map(function (word) {
      return wordToPigLatin(word)
    })
    .join(' ')
}

function wordToPigLatin(word) {
  return word
    .replace(/^([aeiouAEIOU])(.*)/, function (...args) {
      return `${args[1]}${args[2]}way`
    })
    .replace(/^([^aeiouAEIOU]+)(.*)/, function (...args) {
      return `${args[2]}${args[1]}ay`
    })
    .replace(/(.*)([\.,\/#!$%\^&\*;:{}=\-_`~()])(.*)/, function (...args) {
      return `${args[1]}${args[3]}${args[2]}`
    })
}
