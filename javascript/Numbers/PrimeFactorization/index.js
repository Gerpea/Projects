const program = require('commander')
const path = require('path')

const { parseNumber, parsePath, saveToFile } = require('./utils.js')
const { factorize, Methods } = require('./Factorization/factorization')

program
  .requiredOption('-n, --number <number>', 'Number to factorize')
  .option('-o, --out <path>', 'Where to save factors')
  .option('-t, --trial', 'Trial')
  .option('-r, --rho', 'Pollard’s Rho')
  .option('-a, --all', 'Find all possible factors')

program.parse(process.argv)
;(async () => {
  const number = parseNumber(program.number)
  const outPath = parsePath(program.out)

  const method = program.rho ? Methods.rho : Methods.trial

  let hrstart = process.hrtime()
  let factors = factorize(method, number, program.all)
  let hrend = process.hrtime(hrstart)

  if (outPath) {
    await saveToFile(outPath, factors.join(', '))
    console.log(`Save factors to ${path.resolve(outPath)}`)
  } else {
    console.log(factors.join(', '))
  }

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
