const program = require('commander')

const { readGraph } = require('./utils')
const { eulerianPath } = require('../utils/graph/algorithm')
const { Graph } = require('../utils/graph')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const path = eulerianPath(graph)
  const hrend = process.hrtime(hrstart)

  if (path.length > 0) {
    console.log(path.map((node) => node.value))
  } else {
    console.log("This graph don't have an Eulerian path or cycle")
  }
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
