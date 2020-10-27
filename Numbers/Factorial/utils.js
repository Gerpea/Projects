const isValid = require('is-valid-path')
const fs = require('fs')

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

exports.saveFactorialToFile = async function (path, factorial) {
  fs.closeSync(fs.openSync(path, 'w'))
  await fs.writeFile(path, factorial, { flag: 'w' }, function (err) {
    if (err) throw err
  })
}
