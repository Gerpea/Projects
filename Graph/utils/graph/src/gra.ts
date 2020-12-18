type NodeValue = string | number

class GraphNode {
  value: NodeValue
  inDegree: number
  outDegree: number

  constructor(value: NodeValue) {
    this.value = value

    this.inDegree = 0
    this.outDegree = 0
  }

  isEqual(node: any): boolean {
    if (node instanceof GraphNode) {
      return this === node || this.value === node.value
    } else {
      return this.value === node
    }
  }
}

type EdgeParams = {
  weight?: number
  directed?: boolean
}

class GraphEdge {
  node: GraphNode
  weight: number
  directed: boolean

  constructor(node: GraphNode, params?: EdgeParams) {
    this.node = node
    this.weight = Infinity
    this.directed = false
    if (params) {
      this.weight = params.weight || this.weight
      this.directed = params.directed || this.directed
    }
  }

  isEqual(edge: any) {
    if (!(edge instanceof GraphEdge)) {
      return false
    }

    return (
      this === edge ||
      (this.node === edge.node && this.weight === edge.weight && this.directed === edge.directed)
    )
  }

  get params(): EdgeParams {
    return {
      directed: this.directed,
      weight: this.weight,
    }
  }
}

class Graph {
  private nodes: Map<GraphNode, Array<GraphEdge>>

  constructor() {
    this.nodes = new Map()
  }

  getNode(node: GraphNode | NodeValue): GraphNode | undefined {
    let value: NodeValue
    if (node instanceof GraphNode) {
      value = node.value
    } else {
      value = node
    }

    const nodes = Array.from(this.nodes.keys())
    return nodes.find((node) => node.isEqual(value))
  }

  addNode(node: GraphNode | NodeValue): GraphNode {
    let addedNode
    if (node instanceof GraphNode) {
      if (!this.getNode(node.value)) {
        this.nodes.set(node, [])
      }
      addedNode = node
    } else {
      const n = new GraphNode(node)
      if (!this.getNode(node)) {
        this.nodes.set(n, [])
      }
      addedNode = n
    }

    return addedNode
  }

  deleteNode(node: NodeValue | GraphNode): boolean {
    const deletedNode = this.getNode(node)
    if (!deletedNode) {
      return false
    }

    this.deleteEdges(deletedNode)
    return this.nodes.delete(deletedNode)
  }

  getEdges(nodeA: NodeValue | GraphNode): Array<GraphEdge>
  getEdges(nodeA: NodeValue | GraphNode, nodeB: NodeValue | GraphNode): Array<GraphEdge>
  getEdges(nodeA: NodeValue | GraphNode, nodeB?: NodeValue | GraphNode): Array<GraphEdge> {
    const nA = this.getNode(nodeA)
    if (!nA) {
      return []
    }

    if (nodeB) {
      const nB = this.getNode(nodeB)
      if (!nB) {
        return []
      }

      return [...(this.nodes.get(nA)?.filter((edge) => edge.node.isEqual(nodeB)) ?? [])]
    } else {
      return [...(this.nodes.get(nA) ?? [])]
    }
  }

  getEdge(
    nodeA: NodeValue | GraphNode,
    nodeB: NodeValue | GraphNode,
    params?: EdgeParams
  ): GraphEdge | undefined {
    const nA = this.getNode(nodeA)
    const nB = this.getNode(nodeB)
    if (!(nA && nB)) {
      return undefined
    }

    const searchingEdge = new GraphEdge(nB, params)
    return this.nodes.get(nA)?.find((edge) => edge.isEqual(searchingEdge))
  }

  addEdge(
    nodeA: NodeValue | GraphNode,
    nodeB: NodeValue | GraphNode,
    params?: EdgeParams
  ): GraphEdge {
    let nA = this.getNode(nodeA)
    let nB = this.getNode(nodeB)
    if (!nA) {
      nA = this.addNode(nodeA)
    }
    if (!nB) {
      nB = this.addNode(nodeB)
    }

    const edge = new GraphEdge(nB, params)
    this.nodes.set(nA, [...(this.nodes.get(nA) ?? []), edge])
    if (!edge.params.directed) {
      this.nodes.set(nB, [...(this.nodes.get(nB) ?? []), new GraphEdge(nA, params)])
    }

    return edge
  }

  deleteEdge(node: NodeValue | GraphNode, delEdge: GraphEdge): boolean {
    const n = this.getNode(node)
    if (!n) {
      return false
    }
    let delIndex = this.nodes.get(n)?.findIndex((edge) => edge.isEqual(delEdge))
    if (delIndex !== undefined && delIndex !== -1) {
      this.nodes.get(n)?.splice(delIndex, 1)
    }

    if (!delEdge.directed) {
      const reverseEdge = new GraphEdge(n, delEdge.params)
      delIndex = this.nodes.get(delEdge.node)?.findIndex((edge) => edge.isEqual(reverseEdge))
      if (delIndex !== undefined && delIndex !== -1) {
        this.nodes.get(delEdge.node)?.splice(delIndex, 1)
      }
    }

    return delIndex !== undefined
  }

  deleteEdges(node: NodeValue | GraphNode): number {
    let delCount = 0
    const edges = [...this.getEdges(node)]
    for (let i = 0; i < edges.length; i++) {
      this.deleteEdge(node, edges[i])
      delCount++
    }

    return delCount
  }

  get nodesCount() {
    return this.nodes.size
  }

  get edgesCount() {
    let count = 0
    for (let edges of this.nodes.values()) {
      count += edges.length
    }

    return count
  }
}

export { NodeValue, EdgeParams, GraphNode, GraphEdge, Graph }
