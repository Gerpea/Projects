import { Graph, GraphEdge, GraphNode } from '../graph'

type ShortestPath = Map<GraphNode, { distance: number; path: Array<GraphNode> }>

function dijkstra(graph: Graph, startNode: GraphNode, endNode?: GraphNode): ShortestPath {
  let shortestPath: ShortestPath = new Map()

  const nodes = graph.getNodes()
  if (nodes.length < 1 || !nodes.find((node) => node.isEqual(startNode))) {
    return shortestPath
  }

  let visitedEdges = new Set<GraphEdge>()
  shortestPath.set(startNode, { distance: 0, path: [startNode] })
  let pq: Array<GraphNode> = [startNode]

  while (pq.length !== 0) {
    let node = pq.shift()!
    let minWeight = Infinity
    for (let edge of graph.getEdges(node)) {
      if (!visitedEdges.has(edge)) {
        if (edge.weight < minWeight) {
          pq.unshift(edge.node)
          minWeight = edge.weight
        } else {
          pq.push(edge.node)
        }

        const newDist = shortestPath.get(node)
          ? shortestPath.get(node)!.distance + edge.weight
          : edge.weight
        const currentDist = shortestPath.get(edge.node)?.distance

        if (currentDist === undefined) {
          shortestPath.set(edge.node, {
            distance: newDist,
            path: [...(shortestPath.get(node)?.path ?? []), edge.node],
          })
        } else if (currentDist > newDist) {
          shortestPath.set(edge.node, {
            distance: newDist,
            path: [...(shortestPath.get(node)?.path ?? []), edge.node],
          })
        }

        if (!edge.directed) {
          visitedEdges.add(edge)
        }
        if (node.isEqual(endNode)) {
          pq = []
          break
        }
      }
    }
  }

  return shortestPath
}

export { dijkstra, ShortestPath }
