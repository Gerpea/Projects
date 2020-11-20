const isValid = require('is-valid-path')
const fs = require('fs')
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

exports.parsePath = function (o) {
  if (!o) {
    return o
  }

  if (!isValid(o)) {
    console.log('Error: you should specify a correct file path')
    process.exit(1)
  }

  return o
}

exports.saveToFile = async function (path, data) {
  fs.closeSync(fs.openSync(path, 'w'))
  await fs.writeFile(path, data, { flag: 'w' }, function (err) {
    if (err) throw err
  })
}
