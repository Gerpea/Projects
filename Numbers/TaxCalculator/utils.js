const BigNumber = require('bignumber.js')

exports.parseDigits = function (n) {
  const number = new BigNumber(n)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}
