class Graph {
  constructor() {
    this.edges = new Map()
  }

  addEdges(mainNode, nodes) {
    nodes.forEach((node) => {
      this.addEdge(mainNode, node)
    })
  }

  addEdge(nodeA, nodeB) {
    if (!this.edges.has(nodeA)) {
      this.addNode(nodeA)
    }
    if (!this.edges.has(nodeB)) {
      this.addNode(nodeB)
    }

    if (!this.edges.get(nodeA).get('nodes').has(nodeB)) {
      this.edges.get(nodeA).set('outDegree', this.edges.get(nodeA).get('outDegree') + 1)
      this.edges.get(nodeB).set('inDegree', this.edges.get(nodeB).get('inDegree') + 1)
    }

    this.edges.set(
      nodeA,
      new Map([
        ['nodes', new Set([...this.edges.get(nodeA).get('nodes'), nodeB])],
        ['inDegree', this.edges.get(nodeA).get('inDegree')],
        ['outDegree', this.edges.get(nodeA).get('outDegree')],
      ])
    )
  }

  deleteEdge(nodeA, nodeB) {
    if (!this.edges.has(nodeA) || !this.edges.has(nodeB)) {
      return false
    }

    if (this.edges.get(nodeA).get('nodes').delete(nodeB)) {
      this.edges.get(nodeA).set('outDegree', this.edges.get(nodeA).get('outDegree') - 1)
      this.edges.get(nodeB).set('inDegree', this.edges.get(nodeB).get('inDegree') - 1)
      return true
    }

    return false
  }

  addNode(node) {
    this.edges.set(
      node,
      new Map([
        ['nodes', new Set()],
        ['inDegree', 0],
        ['outDegree', 0],
      ])
    )
  }

  deleteNode(deletedNode) {
    if (!this.edges.has(deletedNode)) {
      return false
    }

    for (let node in this.edges.keys()) {
      this.deleteEdge(node, deletedNode)
      this.edges.get(node).get('nodes').delete(deletedNode)
    }

    return this.edges.delete(deletedNode)
  }

  getNodes(node) {
    if (!this.edges.has(node)) {
      return new Set()
    }

    return this.edges.get(node).get('nodes')
  }

  eulerianPath() {
    const findStartNode = (graph) => {
      let start = graph.edges.keys().next().value
      for (let [node, nodeValue] of graph.edges.entries()) {
        if (nodeValue.get('outDegree') - nodeValue.get('inDegree') === 1) {
          return node
        }
        if (nodeValue.get('outDegree') > 0) {
          start = node
        }
      }

      return start
    }

    if (!this.hasEulerianPath() || !this.edges.size > 0) {
      return []
    }

    let path = []
    let graphCopy = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    let currentNode = findStartNode(graphCopy)
    while (this.edges.get(currentNode).get('outDegree') !== 0) {
      path.push(currentNode)
      const nextNode = graphCopy.getNodes(currentNode).values().next().value
      graphCopy.deleteEdge(currentNode, nextNode)
      currentNode = nextNode
    }

    path.push(currentNode)

    return path
  }

  hasEulerianPath() {
    let startNodes = 0
    let endNodes = 0
    for (let [_, nodeValue] of this.edges.entries()) {
      if (Math.abs(nodeValue.get('inDegree') - nodeValue.get('outDegree')) > 1) {
        return false
      } else if (nodeValue.get('inDegree') - nodeValue.get('outDegree') === 1) {
        endNodes++
      } else if (nodeValue.get('outDegree') - nodeValue.get('inDegree') === 1) {
        startNodes++
      }
    }

    return (startNodes === 0 && endNodes === 0) || (startNodes === 1 && endNodes === 1)
  }

  hasEulerianCircuit() {
    for (let [_, nodeValue] of this.edges.entries()) {
      if (Math.abs(nodeValue.get('inDegree') - nodeValue.get('outDegree')) !== 0) {
        return false
      }
    }

    return true
  }
}

module.exports = { Graph }
