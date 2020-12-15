const isValid = require('is-valid-path')
const fs = require('fs')

const { Graph } = require('./graph')

exports.readGraph = function (path) {
  if (parsePath(path)) {
    const graph = new Graph()
    let fileContent = ''
    try {
      fileContent = fs.readFileSync(path)
    } catch (_) {
      console.log('Error: file does not exist')
      process.exit(1)
    }

    let json = {}
    try {
      json = JSON.parse(fileContent)
    } catch (_) {
      console.log('Error: graph should be in json format')
      process.exit(1)
    }

    for (let node in json) {
      graph.addEdges(node, json[node])
    }

    return graph
  }
}

parsePath = function (o) {
  if (!o) {
    return o
  }

  if (!isValid(o)) {
    console.log('Error: you should specify a correct file path')
    process.exit(1)
  }

  return o
}
