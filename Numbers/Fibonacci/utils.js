const fs = require('fs')
const isValid = require('is-valid-path')
const BigNumber = require('bignumber.js')

exports.parseDigits = function (d) {
  const digits = new BigNumber(d)
  if (digits.isInteger()) {
    return digits
  } else {
    console.log('Error: digits should be an integer value')
    process.exit(1)
  }
}

exports.parsePath = function (o) {
  if (!o) {
    return o
  }

  if (!isValid(o)) {
    console.log('Error: you should specify a correct file path')
    process.exit(1)
  }

  checkFile(o)
  return o
}

function checkFile(path) {
  fs.closeSync(fs.openSync(path, 'w'))
}
