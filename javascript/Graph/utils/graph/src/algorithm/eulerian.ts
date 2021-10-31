import { Graph, GraphEdge, GraphNode } from '../graph'

function eulerianPath(graph: Graph): Array<GraphNode> {
  let path: Array<GraphNode> = []
  let visitedEdges = new Set<GraphEdge>()
  const nodes = graph.getNodes()

  if (!hasEulerianPath(nodes)) {
    return path
  }

  let currentNode = findStartNode(nodes)!
  while (visitedEdges.size !== graph.edgesCount) {
    path.push(currentNode)
    const edge = graph.getEdges(currentNode).find((edge) => !visitedEdges.has(edge))
    if (edge?.node) {
      visitedEdges.add(edge)
      if (!edge.directed) {
        visitedEdges.add(graph.getEdges(edge.node).find((e) => e.node.isEqual(currentNode))!)
      }
      currentNode = edge.node
    } else {
      break
    }
  }
  path.push(currentNode)

  return path
}

function eulerianCycle(graph: Graph): Array<GraphNode> {
  if (!hasEulerianCycle(graph.getNodes())) {
    return []
  }

  return eulerianPath(graph)
}

function hasEulerianPath(nodes: Array<GraphNode>): boolean {
  let startNodes = 0
  let endNodes = 0

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

function hasEulerianCycle(nodes: Array<GraphNode>): boolean {
  for (let node of nodes) {
    if (Math.abs(node.inDegree - node.outDegree) !== 0) {
      return false
    }
  }

  return nodes.length > 0
}

function findStartNode(nodes: Array<GraphNode>): GraphNode | undefined {
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

export { eulerianPath, eulerianCycle }
