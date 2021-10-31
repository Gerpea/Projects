exports.parseNumber = function (n) {
  const number = parseInt(n)
  if (!isNaN(number)) {
    if (number > 0) {
      return number
    }
    console.log('Error: number should be a positive integer')
    process.exit(1)
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}
