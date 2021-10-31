const vowels = {
  a: 0,
  e: 0,
  i: 0,
  o: 0,
  u: 0,
}

exports.countVowels = function (str) {
  let result = { ...vowels }
  Array.from(str).forEach(function (char) {
    if (result.hasOwnProperty(char)) {
      result[char]++
    }
  })

  return result
}
