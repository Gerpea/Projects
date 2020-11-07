const program = require('commander')

const { mergeSort, iterMergeSort, bubbleSort } = require('./sort')
const { parseNumber, generateArray } = require('./utils.js')

program.option('-s, --size <number>', 'Array size', '10')

program.parse(process.argv)
;(async () => {
  const size = parseNumber(program.size)

  const array = generateArray(size)
  let sorted = undefined

  let hrstart, hrend

  hrstart = process.hrtime()
  sorted = mergeSort(array)
  hrend = process.hrtime(hrstart)

  console.log(`Sorted with recursive merge sort:[ ${sorted} ]`)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)

  sorted = undefined
  hrstart = process.hrtime()
  sorted = iterMergeSort(array)
  hrend = process.hrtime(hrstart)

  console.log(`Sorted with iterative merge sort:[ ${sorted} ]`)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)

  sorted = undefined
  hrstart = process.hrtime()
  sorted = bubbleSort(array)
  hrend = process.hrtime(hrstart)

  console.log(`Sorted with bubble sort:[ ${sorted} ]`)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
