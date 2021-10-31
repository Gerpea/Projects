const vocabularies = require('./vocabularies')
const { cleanNumber, removeLeadingZeros } = require('./utils')

let numberWords = vocabularies.en.numberWords
let numberZeros = vocabularies.en.numberZeros
let operations = vocabularies.en.operations

function convert(number, lang) {
  if (vocabularies.hasOwnProperty(lang)) {
    numberWords = vocabularies[lang].numberWords
    numberZeros = vocabularies[lang].numberZeros
    operations = vocabularies[lang].operations
  }

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
  const numberWithoutZeros = removeLeadingZeros(number)
  return getNumberWord(numberWithoutZeros) || convertPoweredNumber(numberWithoutZeros)
}

function convertPoweredNumber(number) {
  let firstDigits = ''

  for (let i = 0; i < number.length; i++) {
    firstDigits += number[i]

    const power = number.length - firstDigits.length
    const powerWord = getPowerWord(power)

    if (powerWord) {
      const nextDigitPos = firstDigits.length
      const numberWord = getNumberWord(firstDigits[0] + Array(power).fill('0').join(''))

      return numberWord
        ? numberWord + startConversion(number.substr(nextDigitPos))
        : startConversion(firstDigits) + powerWord + startConversion(number.substr(nextDigitPos))
    }
  }

  return ''
}

function getNumberWord(number) {
  if (numberWords.hasOwnProperty(number)) {
    return numberWords[number]
  } else {
    return false
  }
}

function getPowerWord(power) {
  if (numberZeros.hasOwnProperty(power)) {
    return numberZeros[power]
  } else {
    return false
  }
}

module.exports = { convert }
