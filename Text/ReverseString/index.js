const program = require('commander')

const { reverseString } = require('./reverse')

program.requiredOption('-s, --str <string>', 'String for reverse')

program.parse(process.argv)
;(async () => {
  const str = program.str

  const hrstart = process.hrtime()
  const revStr = reverseString(str)
  const hrend = process.hrtime(hrstart)

  console.log(revStr)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
