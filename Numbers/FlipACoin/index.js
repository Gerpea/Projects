const path = require('path')
const os = require('os')
const fs = require('fs')
const BigNumber = require('bignumber.js')
const program = require('commander')

const { Coin, flipCoinNTimes } = require('./coin')
const { parsePath, parseDigits } = require('./utils.js')

program
  .requiredOption('-d, --digits <digits>', 'how many flips do you need?')
  .option('-o, --out <path>', 'where to save outcomes')

program.parse(process.argv)
;(() => {
  const digits = parseDigits(program.digits)
  const outPath = parsePath(program.out)

  let stream = process.stdout
  if (outPath) {
    stream = fs.createWriteStream(outPath, { flags: 'w' })
  }

  let heads = new BigNumber(0)

  const hrstart = process.hrtime()
  flipCoinNTimes(digits, (result) => {
    if (result === Coin.Head) {
      heads = heads.plus(1)
    }
    stream.write(`${result}`)
  })
  const hrend = process.hrtime(hrstart)

  stream.write(os.EOL)

  stream.write(`Heads: ${heads}`)
  stream.write(os.EOL)
  stream.write(`Tails: ${digits.minus(heads).toFixed()}`)

  stream.write(os.EOL)

  if (outPath) {
    console.log(`Saved outcomes to ${path.resolve(outPath)}`)
  }

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
