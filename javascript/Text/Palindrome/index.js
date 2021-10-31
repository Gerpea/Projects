const program = require('commander')

const { isPalindrome } = require('./palindrome')

program.requiredOption('-s, --str <string>', 'String for check')

program.parse(process.argv)
;(async () => {
  const str = program.str

  const hrstart = process.hrtime()
  const isPal = isPalindrome(str)
  const hrend = process.hrtime(hrstart)

  console.log(isPal)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
