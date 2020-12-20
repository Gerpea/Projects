import 'mocha'
import { expect } from 'chai'

import { Graph, GraphNode } from '../../src/gra'
import { eulerianPath } from '../../src/algorithm/eulerianPath'

describe('EulerianPath', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  it('Should return empty path if graph is empty', function () {
    const expected: Array<GraphNode> = []

    const result = eulerianPath(graph)

    expect(result).deep.equal(expected)
  })

  it('Should return empty path when graph does not has eulerian path', function () {
    const expected: Array<GraphNode> = []
    graph.addEdge('Node_1', 'Node_2', {
      directed: true,
    })
    graph.addEdge('Node_1', 'Node_3')
    graph.addEdge('Node_4', 'Node_3', {
      directed: true,
    })
    graph.addEdge('Node_4', 'Node_2', {
      directed: true,
    })

    const result = eulerianPath(graph)

    expect(result).deep.equal(expected)
  })

  it('Should return eulerian path', function () {
    const expected: Array<GraphNode> = [
      new GraphNode('Node_1'),
      new GraphNode('Node_2'),
      new GraphNode('Node_4'),
      new GraphNode('Node_3'),
    ]

    for (let i = 0; i < expected.length - 1; i++) {
      graph.addEdge(expected[i], expected[i + 1])
    }

    const path = eulerianPath(graph)
    console.log(path)
    let result = expected.length === path.length
    for (let i = 0; i < expected.length; i++) {
      result = result && expected[expected.length - 1 - i].isEqual(path[i])
    }
    expect(result).equal(true)
  })
})
