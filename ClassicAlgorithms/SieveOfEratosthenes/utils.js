const isValid = require('is-valid-path')
const fs = require('fs')

exports.parseNumber = function (n) {
  const number = parseInt(n, 10)
  if (!isNaN(number)) {
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

exports.savePrimesToFile = function (path, primes) {
  fs.closeSync(fs.openSync(path, 'w'))
  fs.writeFile(path, primes.join(', '), { flag: 'w' }, function (err) {
    if (err) throw err
  })
}
