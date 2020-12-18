export type GraphNode = string | number

class GraphEdge {
  node: GraphNode
  weight: number
  directed: boolean

  constructor(node: GraphNode) {
    this.node = node
    this.weight = Infinity
    this.directed = true
  }
}

class NodeValue {
  edges: Set<GraphEdge>
  inDegree: number
  outDegree: number

  constructor() {
    this.edges = new Set()
    this.inDegree = 0
    this.outDegree = 0
  }
}

export class Graph {
  private edges: Map<GraphNode, NodeValue>

  constructor() {
    this.edges = new Map()
  }

  addEdges(mainNode: GraphNode, nodes: Array<GraphNode>): void {
    nodes.forEach((node) => {
      this.addEdge(mainNode, node)
    })
  }

  addEdge(nodeA: GraphNode, nodeB: GraphNode, weight = 0, directed = true): void {
    this.createNodesIfNotExist([nodeA, nodeB])

    if (
      !Array.from(this.edges.get(nodeA)!.edges.values()).find((edge) => {
        edge.node === nodeB
      })
    ) {
      this.edges.get(nodeA)!.outDegree++
      this.edges.get(nodeB)!.inDegree++
    }

    this.edges.get(nodeA)!.edges.add(new GraphEdge(nodeB))
  }

  addNode(node: GraphNode): void {
    this.edges.set(node, new NodeValue())
  }

  deleteEdge(nodeA: GraphNode, nodeB: GraphNode): boolean {
    if (!this.nodesExist([nodeA, nodeB])) {
      return false
    }

    this.edges.get(nodeA)!.nodes.delete(nodeB)
    this.edges.get(nodeA)!.outDegree--
    this.edges.get(nodeB)!.inDegree--

    return true
  }

  deleteNode(deletedNode: GraphNode): boolean {
    if (!this.nodeExist(deletedNode)) {
      return false
    }

    this.edges.delete(deletedNode)

    this.edges.forEach((nodeValue, node) => {
      this.deleteEdge(node, deletedNode)
      nodeValue.nodes.delete(deletedNode)
    })

    return true
  }

  nodesExist(nodes: Array<GraphNode>): boolean {
    return nodes.every((node) => {
      return this.nodeExist(node)
    })
  }

  nodeExist(node: GraphNode): boolean {
    return this.edges.has(node)
  }

  eulerianPath(): Array<GraphNode> {
    const findStartNode = (graph: Graph) => {
      let start = graph.edges.keys().next().value
      for (let [node, nodeValue] of graph.edges.entries()) {
        if (nodeValue.outDegree - nodeValue.inDegree === 1) {
          return node
        }
        if (nodeValue.outDegree > 0) {
          start = node
        }
      }

      return start
    }

    if (this.edges.size === 0 || !this.hasEulerianPath()) {
      return []
    }

    let path: Array<GraphNode> = []
    let graphCopy = this.copy()

    let currentNode = findStartNode(graphCopy)
    while (this.edges.get(currentNode)!.outDegree !== 0) {
      path.push(currentNode)
      const nextNode = graphCopy.edges.get(currentNode)?.nodes.values().next().value
      graphCopy.deleteEdge(currentNode, nextNode)
      currentNode = nextNode
    }
    path.push(currentNode)

    return path
  }

  hasEulerianPath(): boolean {
    let startNodes = 0
    let endNodes = 0

    for (let [_, nodeValue] of this.edges.entries()) {
      if (Math.abs(nodeValue.inDegree - nodeValue.outDegree) > 1) {
        return false
      } else if (nodeValue.inDegree - nodeValue.outDegree === 1) {
        endNodes++
      } else if (nodeValue.outDegree - nodeValue.inDegree === 1) {
        startNodes++
      }
    }

    return (startNodes === 0 && endNodes === 0) || (startNodes === 1 && endNodes === 1)
  }

  hasEulerianCircle(): boolean {
    for (let [_, nodeValue] of this.edges.entries()) {
      if (Math.abs(nodeValue.inDegree - nodeValue.outDegree) !== 0) {
        return false
      }
    }

    return true
  }

  connected(): boolean {
    const findStartNode = (graph: Graph): GraphNode => {
      let size = Array.of(graph.edges.keys()).length
      const nodeAt = Math.floor(Math.random() * size)
      let i = 0
      for (let [node, _] of graph.edges.entries()) {
        if (i === nodeAt) {
          return node
        }
      }

      return graph.edges.keys().next().value
    }

    let visited = new Set<GraphNode>()
    let graphCopy = this.copy()
    let currentNode = findStartNode(graphCopy)
    while (currentNode && this.edges.get(currentNode)!.outDegree !== 0) {
      visited.add(currentNode)
      const nextNode = graphCopy.edges.get(currentNode)?.nodes.values().next().value
      graphCopy.deleteEdge(currentNode, nextNode)
      currentNode = nextNode
    }

    const difference = new Set([...this.edges.keys()].filter((node) => !visited.has(node)))
    return difference.size === 0
  }

  dijkstra() {}

  private createNodesIfNotExist(nodes: Array<GraphNode>): void {
    nodes.forEach((node) => {
      this.createNodeIfNotExist(node)
    })
  }

  private createNodeIfNotExist(node: GraphNode): void {
    if (!this.edges.has(node)) {
      this.addNode(node)
    }
  }

  private copy(): Graph {
    let newGraph = new Graph()
    this.edges.forEach((nodeValue, node) => {
      newGraph.addEdges(node, [...nodeValue.nodes])
    })

    return newGraph
  }
}
