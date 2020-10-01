const os = require('os')
const fs = require('fs')
const path = require('path')
const program = require('commander')

const { calculateFibonacciNumber } = require('./fibonacci')
const { parseDigits, parsePath } = require('./utils.js')

program
  .option('-d, --digits <digits>', 'number of digit to calculate', '5')
  .option('-o, --out <path>', 'where to save the calculated Fibonacci sequence')
  .option('-e, --exclusively', 'Output only one element of the Fibonacci sequence')

program.parse(process.argv)
;(() => {
  const digits = parseDigits(program.digits)
  const outPath = parsePath(program.out)

  let stream = process.stdout
  if (outPath) {
    stream = fs.createWriteStream(outPath, { flags: 'w' })
  }

  const hrstart = process.hrtime()
  calculateFibonacciNumber(digits, (digit) => stream.write(`${digit} `), !program.exclusively)
  const hrend = process.hrtime(hrstart)

  stream.write(os.EOL)

  if (outPath) {
    console.log(`Saved Fibonacci sequence to ${path.resolve(outPath)}`)
  }
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
