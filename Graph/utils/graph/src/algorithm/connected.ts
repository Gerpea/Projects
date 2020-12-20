import { Graph, GraphNode } from '../../src/gra'

function isConnected(graph: Graph, node?: GraphNode): boolean {
  if (node) {
    return isNodeConnected(graph, node)
  }
  return graph.getNodes().every((node) => isNodeConnected(graph, node))
}

function isNodeConnected(graph: Graph, node: GraphNode): boolean {
  const edges = graph.getEdges(node)
  const nodes = graph.getNodes()

  return nodes.filter((n) => edges.find((edge) => edge.node.isEqual(n))).length === nodes.length - 1
}

export { isConnected }
