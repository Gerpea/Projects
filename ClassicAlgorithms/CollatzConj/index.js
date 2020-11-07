const program = require('commander')

const { collatz } = require('./collatz')
const { parseNumber } = require('./utils')

program.requiredOption('-n, --number <number>', 'Number to check')

program.parse(process.argv)
;(async () => {
  const number = parseNumber(program.number)

  const hrstart = process.hrtime()
  const numberOfSteps = collatz(number)
  const hrend = process.hrtime(hrstart)

  console.log(numberOfSteps)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
