import 'mocha'
import { expect } from 'chai'

import { Graph, GraphNode } from '../../src/graph'
import { bfs } from '../../src/algorithm/bfs'

describe('BFS', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  it('Should traverse all directed nodes', function () {
    const expected: Array<GraphNode> = []
    for (let i = 0; i < 10; i++) {
      const nodeA = new GraphNode(`Node_${i}`)
      const nodeB = new GraphNode(`Node_${i + 1}`)
      graph.addEdge(nodeA, nodeB, {
        directed: true,
      })
      expected.push(nodeB)
    }

    let result = Array.from(bfs(graph, graph.getNode('Node_0')!))

    expect(result.length).equal(expected.length + 1)
  })

  it('Should traverse all undirected nodes', function () {
    const expected: Array<GraphNode> = []
    for (let i = 0; i < 10; i++) {
      const nodeA = new GraphNode(`Node_${i}`)
      const nodeB = new GraphNode(`Node_${i + 1}`)
      graph.addEdge(nodeA, nodeB)
      expected.push(nodeB)
    }

    let result = Array.from(bfs(graph, graph.getNode('Node_0')!))

    expect(result.length).equal(expected.length + 1)
  })

  it('Should traverse all in correct nodes', function () {
    graph.addEdge('Node_1', 'Node_2')
    graph.addEdge('Node_1', 'Node_3')
    graph.addEdge('Node_3', 'Node_4')
    graph.addEdge('Node_4', 'Node_5')
    graph.addEdge('Node_4', 'Node_6', {
      directed: true,
    })
    graph.addEdge('Node_5', 'Node_4', {
      directed: true,
    })
    graph.addEdge('Node_5', 'Node_7', {
      directed: true,
    })
    graph.addEdge('Node_7', 'Node_4')
    graph.addEdge('Node_8', 'Node_9')

    const expected: Array<GraphNode> = [
      graph.getNode('Node_1')!,
      graph.getNode('Node_2')!,
      graph.getNode('Node_3')!,
      graph.getNode('Node_4')!,
      graph.getNode('Node_5')!,
      graph.getNode('Node_6')!,
      graph.getNode('Node_7')!,
    ]

    let traversed = Array.from(bfs(graph, graph.getNode('Node_1')!))

    let result = expected.length === traversed.length
    for (let i = 0; i < traversed.length; i++) {
      result = result && traversed[i].isEqual(expected[i])
    }
    expect(result).equal(true)
  })
})
