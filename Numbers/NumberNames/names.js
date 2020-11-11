const { ones, powers, operations } = require('./const')

function convert(number) {
  const cleanedNumber = cleanNumber(number)

  if (cleanedNumber.length <= 2) {
    return convertOnes(cleanedNumber)
  } else {
    return convertManys(cleanedNumber)
  }
}

function cleanNumber(number) {
  return number.replace(/^0+/, '')
}

function convertOnes(number) {
  let result = ''
  if (ones.hasOwnProperty(number)) {
    result += ones[number]
  } else {
    const firstDigit = number.substr(0, 1)
    const firstDigitTimes10 = firstDigit.length > 0 ? firstDigit + '0' : ''
    const secondDigit = number.substr(1, 1)

    if (ones.hasOwnProperty(firstDigitTimes10)) {
      result += ones[firstDigitTimes10]
    }
    if (ones.hasOwnProperty(secondDigit)) {
      result += ' ' + ones[secondDigit]
    }
  }

  return result.trim()
}

function convertManys(number) {
  let firstDigits = ''

  for (let i = 0; i < number.length; i++) {
    firstDigits += number[i]
    const zeros = number.length - (i + 1)

    if (powers.hasOwnProperty(zeros)) {
      const nextDigitPos = firstDigits.length
      return `${convert(firstDigits)} ${powers[zeros]} ${convert(
        number.substr(nextDigitPos)
      )}`.trim()
    }
  }

  return ''
}

module.exports = { convert }
