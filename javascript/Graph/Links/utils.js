var Url = require('url-parse')

exports.parseLink = function (link) {
  const url = new Url(link)
  return `${url.hostname}${url.pathname}`
}

exports.parseNumber = function (n) {
  const number = parseInt(n, 10)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}
