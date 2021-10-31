const program = require('commander')
const path = require('path')

const { computeFactorial, computeFactorialRecursive } = require('./factorial')
const { parsePath, saveFactorialToFile } = require('./utils.js')

program
  .requiredOption('-d, --digits <digits>', 'number of digit to calculate')
  .option('-o, --out <path>', 'where to save calculated factorial')
  .option('-r, --recursive', 'Use recursive function?')

program.parse(process.argv)
;(async () => {
  const digits = program.digits
  const outPath = parsePath(program.out)

  const calcFunc = program.recursive ? computeFactorialRecursive : computeFactorial

  const hrstart = process.hrtime()
  const fact = (await calcFunc(digits)).toFixed()
  const hrend = process.hrtime(hrstart)

  if (outPath) {
    await saveFactorialToFile(outPath, fact)
    console.log(`Saved factorial to ${path.resolve(outPath)}`)
  } else {
    console.log(fact.toString())
  }

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
