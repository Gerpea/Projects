const BigNumber = require('bignumber.js')

exports.parseNumber = function (d) {
  const number = new BigNumber(d)
  if (number.isInteger()) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}
