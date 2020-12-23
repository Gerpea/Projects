const program = require('commander')

const { readGraph } = require('./utils')
const { mst } = require('../utils/graph/algorithm')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const tree = mst(graph, graph.getNodes()[0])
  const hrend = process.hrtime(hrstart)

  for (let node of tree.tree.getNodes()) {
    const edges = tree.tree.getEdges(node)
    console.log(`'${node.value}' => [${edges.length > 0 ? '' : ']'}`)
    for (let edge of edges) {
      console.log(`  '${edge.node.value}'`)
    }
    if (edges.length > 0) {
      console.log(']')
    }
  }
  console.log('MST cost:', tree.cost)
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
