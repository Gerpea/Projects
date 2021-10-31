const program = require('commander')

const { convert } = require('./names')

program
  .requiredOption('-n, --number <digits>', 'Number to convert')
  .option('-l, --lang <string>', 'language for output')

program.parse(process.argv)
;(() => {
  const number = program.number
  const lang = program.lang

  const npstart = process.hrtime()
  const numberInWords = convert(number, lang)
  const npend = process.hrtime(npstart)

  console.log(numberInWords)
  console.info(`Execution time (hr): ${npend[0]}s ${npend[1] / 1000000}ms`)
})()
