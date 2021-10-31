exports.isPalindrome = function (str) {
  const perpStr = str.toLowerCase().replace(/\s/g, '')
  return Array.from(perpStr).every(function (char, index) {
    return char === perpStr[perpStr.length - index - 1]
  })
}
