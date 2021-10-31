exports.parseNumber = function (n) {
  const number = parseInt(n, 10)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}
