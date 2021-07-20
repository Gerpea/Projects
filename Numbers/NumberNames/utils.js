function cleanNumber(number) {
  return removeSpaces(removeLeadingZeros(number))
}

function removeLeadingZeros(number) {
  return number.replace(/^0+/, '')
}

function removeSpaces(number) {
  return number.replace(/\s/g, '')
}

module.exports = { cleanNumber, removeLeadingZeros, removeSpaces }
