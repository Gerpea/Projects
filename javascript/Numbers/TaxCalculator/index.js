/*
  Compute PI with Chudnovsky series
*/
const program = require('commander')

const { calculateCostWithTax } = require('./tax')
const { parseDigits } = require('./utils')

program
  .requiredOption('-c, --cost <digits>', 'The cost')
  .requiredOption('-t, --tax <path>', 'The tax')

program.parse(process.argv)
;(async () => {
  const cost = parseDigits(program.cost)
  const tax = parseDigits(program.tax)

  const hrstart = process.hrtime()
  const costWithTax = calculateCostWithTax(cost, tax.div(100))
  const hrend = process.hrtime(hrstart)

  console.log(`The tax is: ${tax}%`)
  console.log(`The total cost with tax: ${costWithTax}`)

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
