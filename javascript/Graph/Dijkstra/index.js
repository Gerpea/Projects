const program = require('commander')

const { readGraph } = require('./utils')
const { dijkstra } = require('../utils/graph/algorithm')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const shortestPath = dijkstra(graph, graph.getNodes()[0])
  const hrend = process.hrtime(hrstart)

  for (let [node, { distance, path }] of shortestPath) {
    console.log(`${node.value} => ${distance}, [`)
    for (let p of path) {
      console.log(`  ${p.value}`)
    }
    console.log(']')
  }
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
