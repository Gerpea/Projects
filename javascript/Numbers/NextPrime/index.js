const program = require('commander')
const readlineSync = require('readline-sync')

const { nextPrime } = require('./prime')
const { parseNumber } = require('./utils')

program.option('-n, --number <digits>', 'Number to start from', '0')

program.parse(process.argv)
;(() => {
  const number = parseNumber(program.number)

  let currentPrime = number

  do {
    const npstart = process.hrtime()
    currentPrime = nextPrime(currentPrime)
    const npend = process.hrtime(npstart)
    console.log(`Prime is: ${currentPrime.toString()}`)
    console.info(`Execution time (hr): ${npend[0]}s ${npend[1] / 1000000}ms`)
  } while (readlineSync.keyInYNStrict('Find next prime?'))
})()
