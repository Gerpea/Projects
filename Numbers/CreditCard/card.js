exports.chekCard = function (digits) {
  let sum = 0

  for (let i = 0; i < digits.length; i++) {
    let value = parseInt(digits[i])
    if ((digits.length - i) % 2 === 0) {
      value *= 2

      if (value > 9) {
        value -= 9
      }
    }

    sum += value
  }

  return sum !== 0 && sum % 10 === 0
}
