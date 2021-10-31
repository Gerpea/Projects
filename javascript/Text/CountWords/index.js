const program = require('commander')

const { countWords } = require('./words')
const { loadFile } = require('./utils')

program
  .option('-s, --str <string>', 'String where count words')
  .option('-f, --file <path>', 'File where count words')

program.parse(process.argv)
;(async () => {
  if (!program.str && !program.file) {
    console.log(program.helpInformation())
    process.exit(0)
  }

  const str = program.str || loadFile(program.file)

  const hrstart = process.hrtime()
  const words = countWords(str)
  const hrend = process.hrtime(hrstart)

  const totalWords = Object.keys(words).length
  console.log('Total words: ', totalWords)
  Object.entries(words).map(function ([word, count]) {
    console.log(`${word}: ${count}, ${((count / totalWords) * 100).toFixed(2)}%`)
  })

  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
