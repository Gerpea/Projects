const { ones, powers, operations } = require('./const')

function convert(number) {
  let result = ''

  const operatorsRegex = new RegExp(
    Object.keys(operations).join('|').replace('.', '\\.').replace('+', '\\+').replace('*', '\\*')
  )

  let remainingNumber = number
  while (remainingNumber.length > 0) {
    const match = remainingNumber.match(operatorsRegex)

    if (match) {
      operatorIdx = match?.index
      result +=
        startConversion(cleanNumber(remainingNumber.substr(0, operatorIdx))) +
        operations[remainingNumber[operatorIdx]]
      remainingNumber = remainingNumber.substr(operatorIdx + 1)
    } else {
      result += startConversion(cleanNumber(remainingNumber))
      remainingNumber = ''
    }
  }

  return result.trim()
}

function startConversion(number) {
  if (number.length <= 2) {
    return convertOnes(number)
  } else {
    return convertManys(number)
  }
}

function cleanNumber(number) {
  return removeSpaces(removeLeadingZeros(number))
}

function removeLeadingZeros(number) {
  return number.replace(/^0+/, '')
}

function removeSpaces(number) {
  return number.replace(/\s/g, '')
}

function convertOnes(number) {
  let result = ''
  if (ones.hasOwnProperty(number)) {
    result += ones[number]
  } else {
    // take first digit
    const firstDigit = number.substr(0, 1)
    // add zero to digit so it becomes power of tens
    const firstDigitTimes10 = firstDigit.length > 0 ? firstDigit + '0' : ''
    // take second digit
    const secondDigit = number.substr(1, 1)

    // add name of one
    if (ones.hasOwnProperty(firstDigitTimes10)) {
      result += ones[firstDigitTimes10]
    }
    // add name of second digit
    if (ones.hasOwnProperty(secondDigit)) {
      result += ones[secondDigit]
    }
  }

  return result
}

// basically we split number by powers and proceed conversion
function convertManys(number) {
  let firstDigits = ''

  // traverse number by digit
  for (let i = 0; i < number.length; i++) {
    // concat number from digits
    firstDigits += number[i]
    // calculate power of number from i digit to end
    const remainingPower = number.length - firstDigits.length // (i + 1)
    // when we find defined power convert number that stand before that power and add power itself
    if (powers.hasOwnProperty(remainingPower)) {
      const nextDigitPos = firstDigits.length
      return (
        startConversion(firstDigits) +
        powers[remainingPower] +
        startConversion(cleanNumber(number.substr(nextDigitPos)))
      )
    }
  }

  return ''
}

module.exports = { convert }
