const program = require('commander')
const path = require('path')

const { computeE } = require('./e.js')
const { parseDigits, parsePath, saveEToFile } = require('./utils.js')

program
  .option('-d, --digits <digits>', 'number of digit to calculate', '2')
  .option('-o, --out <path>', 'where to save calculated e')

program.parse(process.argv)
;(async () => {
  const digits = parseDigits(program.digits)
  const outPath = parsePath(program.out)

  const hrstart = process.hrtime()
  const e = computeE(digits)
  const hrend = process.hrtime(hrstart)

  if (outPath) {
    await saveEToFile(outPath, e)
    console.log(`Saved e to ${path.resolve(outPath)}`)
  } else {
    console.log(e.toString())
  }

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
