import 'mocha'
import { expect } from 'chai'

import { Graph, GraphNode } from '../../src/graph'
import { isConnected } from '../../src/algorithm/connected'

describe('Connected', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  it('Should return true for empty graph', function () {
    const expected = true

    const result = isConnected(graph)

    expect(result).equal(expected)
  })

  it('Should return true for connected node', function () {
    const expected = true
    const node = new GraphNode('Node_1')
    graph.addEdge(node, 'Node_2')
    graph.addEdge(node, 'Node_3')
    graph.addEdge('Node_2', 'Node_3')
    graph.addEdge(node, 'Node_4', {
      directed: true,
    })

    const result = isConnected(graph, node)

    expect(result).equal(expected)
  })

  it('Should return true for connected graph', function () {
    const expected = true
    graph.addEdge('Node_1', 'Node_2')
    graph.addEdge('Node_1', 'Node_3')
    graph.addEdge('Node_1', 'Node_4')
    graph.addEdge('Node_2', 'Node_4')
    graph.addEdge('Node_2', 'Node_3')
    graph.addEdge('Node_3', 'Node_4')

    const result = isConnected(graph)

    expect(result).equal(expected)
  })
})
