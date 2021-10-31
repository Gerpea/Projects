const program = require('commander')

const { calculateLimit } = require('./limit')

program
  .requiredOption('-f, --func <function>', 'Function')
  .requiredOption('-l, --limit <number>', 'Limit')

program.parse(process.argv)
;(() => {
  const func = program.func
  const limit = program.limit

  const hrstart = process.hrtime()
  const result = calculateLimit(func, limit)
  const hrend = process.hrtime(hrstart)

  console.log(result)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
