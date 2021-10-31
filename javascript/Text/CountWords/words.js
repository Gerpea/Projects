exports.countWords = function (str) {
  let result = {}
  const words = str.replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ').match(/\S+/g) || [str]
  words.map(function (word) {
    if (!result.hasOwnProperty(word)) {
      result[word] = 0
    }

    result[word]++
  })

  return result
}
