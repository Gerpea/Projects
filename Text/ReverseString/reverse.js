exports.reverseString = function (str) {
  return str
    .split('')
    .map(function (_, index) {
      return str[str.length - index - 1]
    })
    .join('')
}
