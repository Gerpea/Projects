const program = require('commander')

const { binToDec, decToBin } = require('./converter.js')

program.option('-d, --dec <digits>', 'decimal number').option('-b, --bin <string>', 'binary number')

program.parse(process.argv)
;(() => {
  const dec = program.dec
  const bin = program.bin

  if (dec) {
    const hrstart = process.hrtime()
    const bin = decToBin(dec)
    const hrend = process.hrtime(hrstart)

    console.log(bin)
    console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
  }

  if (bin) {
    const hrstart = process.hrtime()
    const dec = binToDec(bin)
    const hrend = process.hrtime(hrstart)

    console.log(dec)
    console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
  }
})()
