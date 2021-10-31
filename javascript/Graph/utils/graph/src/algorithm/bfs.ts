import { Graph, GraphEdge, GraphNode } from '../graph'

function* bfs(graph: Graph, startNode: GraphNode) {
  let visitedNodes = new Set<GraphNode>()
  let nodesToVisit = new Set<GraphNode>()

  let node: GraphNode | undefined = startNode
  yield node
  visitedNodes.add(node)
  nodesToVisit.add(node)
  while (node) {
    const edges: Array<GraphEdge> = graph.getEdges(node)

    for (let edge of edges) {
      if (!visitedNodes.has(edge.node)) {
        yield edge.node
        visitedNodes.add(edge.node)
        nodesToVisit.add(edge.node)
      }
    }

    nodesToVisit.delete(node)
    node = nodesToVisit.keys().next().value
  }
}

export { bfs }
