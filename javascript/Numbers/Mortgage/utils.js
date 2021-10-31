const BigNumber = require('bignumber.js')

exports.convertToBigNumber = function (input, _) {
  return new BigNumber(input)
}

exports.shouldBeNumber = function (input, _) {
  if (isNaN(input)) {
    return 'Should be a number'
  }

  return true
}

exports.displayBigNumber = function (input, _, __) {
  return input.toString()
}
