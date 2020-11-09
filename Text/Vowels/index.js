const program = require('commander')

const { countVowels } = require('./vowels')

program.requiredOption('-s, --str <string>', 'String for count')

program.parse(process.argv)
;(async () => {
  const str = program.str

  const hrstart = process.hrtime()
  const vowels = countVowels(str)
  const hrend = process.hrtime(hrstart)

  console.log('a:', vowels.a)
  console.log('e:', vowels.e)
  console.log('i:', vowels.i)
  console.log('o:', vowels.o)
  console.log('u:', vowels.u)

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
