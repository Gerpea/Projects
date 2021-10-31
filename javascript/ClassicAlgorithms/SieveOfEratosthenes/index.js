const program = require('commander')
const path = require('path')

const { sieveEratosthenes } = require('./sieve')
const { parseNumber, parsePath, savePrimesToFile } = require('./utils.js')

program
  .requiredOption('-n, --number <number>', 'Number to look for')
  .option('-o, --out <path>', 'Where to save primes')

program.parse(process.argv)
;(async () => {
  const number = parseNumber(program.number)
  const outPath = parsePath(program.out)

  const hrstart = process.hrtime()
  const primes = sieveEratosthenes(number)
  const hrend = process.hrtime(hrstart)

  if (outPath) {
    savePrimesToFile(outPath, primes)
    console.log(`Saved primes to ${path.resolve(outPath)}`)
  } else {
    console.log(primes.join(', '))
  }

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
