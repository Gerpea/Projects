const program = require('commander')

const { closestDistance } = require('./point')
const { savePointsToFile, parseNumber, parsePath, readPoints, generatePoints } = require('./utils')

program
  .option('-f, --file <path>', 'Path to file with points')
  .option('-c, --count <number>', 'Number of points to generate', '10')
  .option('-n, --min <number>', 'Minimum coordinate', '-100')
  .option('-x, --max <number>', 'Maximum coordinate', '100')
  .option('-s, --save <path>', 'Where to save generated points')

program.parse(process.argv)
;(() => {
  let points = readPoints(program.file)
  if (program.file) {
    points = readPoints(program.file)
  } else {
    const count = parseNumber(program.count)
    const min = parseNumber(program.min)
    const max = parseNumber(program.max)

    points = generatePoints(count, min, max)

    const outPath = parsePath(program.save)
    if (outPath) {
      savePointsToFile(outPath, points)
    }
  }

  const hrstart = process.hrtime()
  const min = closestDistance(points).toFixed(2)
  const hrend = process.hrtime(hrstart)

  console.log(min)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
