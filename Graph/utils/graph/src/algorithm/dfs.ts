import { Graph, GraphNode } from '../gra'

function* dfs(graph: Graph, startNode: GraphNode) {
  let visitedNodes = new Set<GraphNode>()

  let node = startNode
  yield node
  visitedNodes.add(node)
  while (node.outDegree !== 0) {
    const edge = graph
      .getEdges(node)
      .find(
        (edge) =>
          !visitedNodes.has(edge.node) ||
          graph.getEdges(edge.node).find((e) => !visitedNodes.has(e.node))
      )
    if (!edge) {
      break
    }

    node = edge.node
    if (!visitedNodes.has(node)) {
      yield node
      visitedNodes.add(node)
    }
  }
}

export { dfs }
