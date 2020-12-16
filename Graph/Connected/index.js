const program = require('commander')

const { readGraph } = require('./utils')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const isConnected = graph.connected()
  const hrend = process.hrtime(hrstart)

  console.log(isConnected)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
