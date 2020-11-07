require('./array')

exports.bubbleSort = function (arr) {
  let result = [...arr]
  let swapped = false

  do {
    swapped = false
    for (let i = 0; i < result.length; i++) {
      if (result[i] > result[i + 1]) {
        result.swap(i, i + 1)
        swapped = true
      }
    }
  } while (swapped)

  return result
}
