class Graph {
  constructor() {
    this.edges = new Map()
  }

  addEdges(node, edges) {
    edges.forEach((edge) => {
      this.addEdge(node, edge)
    })
  }

  addEdge(nodeA, nodeB) {
    if (!this.edges.has(nodeA)) {
      this.addNode(nodeA)
    }
    if (!this.edges.has(nodeB)) {
      this.addNode(nodeB)
    }

    this.edges.set(nodeA, new Set([...this.edges.get(nodeA), nodeB]))
  }

  addNode(node) {
    this.edges.set(node, new Set())
  }

  getEdges(node) {
    if (!this.edges.has(node)) {
      throw new Error('This node does not exist')
    }

    this.edges.get(node)
  }
}

module.exports = { Graph }
