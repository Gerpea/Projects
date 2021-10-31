const isValid = require('is-valid-path')
const fs = require('fs')

exports.loadFile = function (path) {
  const p = parsePath(path)
  try {
    if (fs.existsSync(p)) {
      return fs.readFileSync(parsePath(p), 'utf8')
    } else {
      console.log("Error: file doesn't exist")
      process.exit(1)
    }
  } catch (_) {
    console.log('Error: some error occurs')
  }
}

function parsePath(o) {
  if (!o) {
    return o
  }

  if (!isValid(o)) {
    console.log('Error: you should specify a correct file path')
    process.exit(1)
  }

  return o
}
