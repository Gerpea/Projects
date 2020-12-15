const program = require('commander')

const buildGraph = require('./buildGraph')
const { parseLink, parseNumber } = require('./utils')

program.requiredOption('-l, --link <string>', 'First link')
program.option('-d, --depth <number>', 'Depth', '1')

program.parse(process.argv)
;(async () => {
  const link = parseLink(program.link)
  const depth = parseNumber(program.depth)

  const hrstart = process.hrtime()
  const linkGraph = await buildGraph(link, depth)
  const hrend = process.hrtime(hrstart)

  console.log(linkGraph)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
