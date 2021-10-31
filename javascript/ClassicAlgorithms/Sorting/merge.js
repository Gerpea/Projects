function mergeSort(arr) {
  if (!arr || !arr.length) {
    return []
  }

  if (arr.length <= 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const aL = arr.slice(0, middle)
  const aH = arr.slice(middle)
  return merge(mergeSort(aL), mergeSort(aH))
}

function iterMergeSort(arr) {
  let result = [...arr]
  let buffer = []

  for (let size = 1; size < result.length; size *= 2) {
    for (let leftStart = 0; leftStart < result.length; leftStart += 2 * size) {
      let left = leftStart
      let right = Math.min(left + size, result.length)
      let leftLimit = right
      let rightLimit = Math.min(right + size, result.length)
      let i = left
      while (left < leftLimit && right < rightLimit) {
        if (result[left] <= result[right]) {
          buffer[i] = result[left]
          left++
          i++
        } else {
          buffer[i] = result[right]
          right++
          i++
        }
      }
      while (left < leftLimit) {
        buffer[i] = result[left]
        left++
        i++
      }
      while (right < rightLimit) {
        buffer[i] = result[right]
        right++
        i++
      }
    }
    let temp = result
    result = buffer
    buffer = temp
  }
  return result
}

function merge(arrFirst, arrSecond) {
  const arrSort = []
  let i = (j = 0)
  while (i < arrFirst.length && j < arrSecond.length) {
    arrSort.push(arrFirst[i] < arrSecond[j] ? arrFirst[i++] : arrSecond[j++])
  }

  return [...arrSort, ...arrFirst.slice(i), ...arrSecond.slice(j)]
}

module.exports = { mergeSort, iterMergeSort }
