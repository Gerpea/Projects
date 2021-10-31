const program = require('commander')

const { readGraph } = require('./utils')
const { isConnected } = require('../utils/graph/algorithm')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const connected = isConnected(graph)
  const hrend = process.hrtime(hrstart)

  console.log(connected)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
