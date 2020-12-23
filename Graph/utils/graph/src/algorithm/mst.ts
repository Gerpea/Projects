import { Graph, GraphEdge, GraphNode } from '../graph'

type MST = { tree: Graph; cost: number }

function mst(graph: Graph, startNode: GraphNode) {
  let result: MST = { tree: new Graph(), cost: 0 }

  const nodes = graph.getNodes()
  if (nodes.length < 1 || !nodes.find((node) => node.isEqual(startNode))) {
    return result
  }

  let visitedEdges = new Set<GraphEdge>()
  let visitedNodes = new Set<GraphNode>()

  const startEdge = new GraphEdge(startNode)
  graph.addNode(new GraphNode(startNode.value))

  visitedNodes.add(startNode)

  let pq: Array<{ node: GraphNode; edge: GraphEdge }> = [
    ...graph.getEdges(startEdge.node).map<{ node: GraphNode; edge: GraphEdge }>((e) => {
      return {
        node: startNode,
        edge: e,
      }
    }),
  ]
  pq.sort((a, b) => a.edge.weight - b.edge.weight)

  for (let edge of graph.getEdges(startEdge.node)) {
    if (!edge.directed) {
      const reversedEdge = graph
        .getEdges(edge.node)
        .find((e) => e.node.isEqual(startEdge.node) && e.weight === edge.weight)
      if (reversedEdge) {
        visitedEdges.add(reversedEdge)
      }
    }
  }

  while (pq.length !== 0) {
    let next = pq.shift()!
    if (visitedEdges.has(next.edge)) {
      continue
    }

    visitedEdges.add(next.edge)

    if (visitedNodes.has(next.edge.node)) {
      let existedEdge: GraphEdge | undefined
      let existedNode: GraphNode | undefined
      for (let node of result.tree.getNodes()) {
        existedEdge = result.tree.getEdges(node).find((e) => e.node.isEqual(next.edge.node))
        if (existedEdge) {
          existedNode = node
          break
        }
      }

      if (existedEdge && existedEdge.weight > next.edge.weight) {
        result.tree.deleteEdge(existedNode!, existedEdge)
        result.cost -= existedEdge.weight
        result.tree.addEdge(next.node, next.edge.node, {
          directed: true,
          weight: next.edge.weight,
        })
        result.cost += next.edge.weight
      }
    } else {
      visitedNodes.add(next.edge.node)
      result.tree.addEdge(next.node, next.edge.node, {
        directed: true,
        weight: next.edge.weight,
      })
      result.cost += next.edge.weight
    }

    let minWeight = Infinity
    for (let edge of graph.getEdges(next.edge.node)) {
      if (!visitedEdges.has(edge)) {
        if (edge.weight < minWeight) {
          pq.unshift({ node: next.edge.node, edge: edge })
          minWeight = edge.weight
        } else {
          pq.push({ node: next.edge.node, edge: edge })
        }
      }

      if (!edge.directed && edge.node.isEqual(next.node)) {
        const reversedEdge = graph
          .getEdges(edge.node)
          .find((e) => e.node.isEqual(next.edge.node) && e.weight === edge.weight)
        if (reversedEdge) {
          visitedEdges.add(reversedEdge)
        }
      }
    }
  }

  return result
}

export { mst, MST }
