const program = require('commander')

const { power } = require('./exp')
const { parseNumber } = require('./utils')

program.requiredOption('-a <number>', 'the number').requiredOption('-b <number>', 'the exponent')

program.parse(process.argv)
;(async () => {
  const a = parseNumber(program.a)
  const b = parseNumber(program.b)

  const hrstart = process.hrtime()
  const result = power(a, b)
  const hrend = process.hrtime(hrstart)

  console.log(result)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
