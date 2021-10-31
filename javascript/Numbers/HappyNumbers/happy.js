exports.isHappy = function (number) {
  let prevs = new Set()
  while (number !== 1) {
    prevs.add(number)

    number = Array.from(number.toString()).reduce(function (prev, curr) {
      return prev + parseInt(curr)
    }, 0)

    if (prevs.has(number)) {
      return false
    }
  }

  return true
}
