import { Graph, GraphNode } from '../gra'
import { dfs } from './dfs'

function eulerianPath(graph: Graph): Array<GraphNode> {
  let path: Array<GraphNode> = []

  if (!hasEulerianPath(graph)) {
    return path
  }

  for (let node of dfs(graph, findStartNode(graph)!)) {
    path.push(node)
  }

  return path
}

function hasEulerianPath(graph: Graph): boolean {
  let startNodes = 0
  let endNodes = 0
  const nodes = graph.getNodes()

  for (let node of nodes) {
    if (Math.abs(node.inDegree - node.outDegree) > 1) {
      return false
    } else if (node.inDegree - node.outDegree === 1) {
      endNodes++
    } else if (node.outDegree - node.inDegree === 1) {
      startNodes++
    }
  }

  return (
    nodes.length > 0 &&
    ((startNodes === 0 && endNodes === 0) || (startNodes === 1 && endNodes === 1))
  )
}

function findStartNode(graph: Graph): GraphNode | undefined {
  let start = undefined

  for (let node of graph.getNodes()) {
    if (node.outDegree - node.inDegree === 1) {
      return node
    }
    if (node.outDegree > 0) {
      start = node
    }
  }

  return start
}

export { eulerianPath }
