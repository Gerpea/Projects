const program = require('commander')

const { readGraph } = require('./utils')

program.option('-f, --file <path>', 'Path to file with graph', 'graph.json')

program.parse(process.argv)
;(async () => {
  const graph = readGraph(program.file)

  const hrstart = process.hrtime()
  const eulerianPath = graph.eulerianPath()
  const hrend = process.hrtime(hrstart)

  if (eulerianPath.length > 0) {
    console.log(eulerianPath)
  } else {
    console.log("This graph don't have an Eulerian path or cycle")
  }
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()
