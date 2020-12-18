import { Graph, GraphNode } from '../gra'

function eulerianPath(graph: Graph): Array<GraphNode> {
  let path: Array<GraphNode> = []

  return path
}

function findStartNode(graph: Graph): GraphNode | undefined {
  const nodes = graph.getNodes()
  let start = undefined

  for (let node of nodes) {
    if (node.outDegree - node.inDegree === 1) {
      return node
    }
    if (node.outDegree > 0) {
      start = node
    }
  }

  return start
}
