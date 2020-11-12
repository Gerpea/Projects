const program = require('commander')

const { isHappy } = require('./happy')
const { parseNumber } = require('./utils')

program
  .option('-c --check <number>', 'Find out if the number is happy')
  .option('-f --first <number>', 'Find first n happy number')

program.parse(process.argv)
;(async () => {
  if (program.check) {
    checkNumber(parseNumber(program.check))
  }

  if (program.first) {
    findFirstHappys(parseNumber(program.first))
  } else if (!program.check) {
    findFirstHappys(parseNumber(8))
  }
})()

function checkNumber(number) {
  const hrstart = process.hrtime()
  const result = isHappy(number)
  const hrend = process.hrtime(hrstart)

  console.log(result)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
}

function findFirstHappys(first) {
  let happys = []

  const hrstart = process.hrtime()
  for (let i = 0; happys.length < first; i++) {
    if (isHappy(i)) {
      happys.push(i)
    }
  }
  const hrend = process.hrtime(hrstart)

  console.log(happys.join(', '))
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
}
