const program = require('commander')

const { fizzBuzz } = require('./fizzBuzz')
const { parseNumber } = require('./utils')

program.option('-n, --number <number>', 'Number to fizzbuzz', '100')

program.parse(process.argv)
;(async () => {
  const number = parseNumber(program.number)

  const hrstart = process.hrtime()
  const fizzBuzzStr = fizzBuzz(number)
  const hrend = process.hrtime(hrstart)

  console.log(fizzBuzzStr)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
