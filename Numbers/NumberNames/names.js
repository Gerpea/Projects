const { ones, powers, operations } = require('./const')

//TODO: refactor
//TODO: try to write it without recursion
function convert(number) {
  number = number.replace(/^0+/, '')
  if (number.length <= 0) {
    return ''
  }

  if (number.length <= 2) {
    if (ones.hasOwnProperty(number)) {
      return ones[number]
    } else {
      return ones[number.substr(0, 1) + '0'] + ' ' + ones[number.substr(1, 1)]
    }
  } else {
    let result = ''
    let det = ''
    for (let i = 0; i < number.length; i++) {
      det += number[i]
      if (det.match(/[^0+]/)) {
        det = det.replace(/^0+/, '')
        if (powers.hasOwnProperty(number.length - (i + 1))) {
          result += `${convert(det)} ${powers[number.length - (i + 1)]} ${convert(
            number.substr(det.length)
          )}`
          break
        }
      }
    }
    return result.trim()
  }
}

module.exports = { convert }
