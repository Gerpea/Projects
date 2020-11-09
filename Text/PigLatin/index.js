const program = require('commander')

const { convertToPigLatin } = require('./pigLatin')

program.requiredOption('-s, --str <string>', 'String for convert to pig latin')

program.parse(process.argv)
;(async () => {
  const str = program.str

  const hrstart = process.hrtime()
  const pagLatinString = convertToPigLatin(str)
  const hrend = process.hrtime(hrstart)

  console.log(pagLatinString)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
