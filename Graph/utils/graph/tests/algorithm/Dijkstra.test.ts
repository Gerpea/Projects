import 'mocha'
import { expect } from 'chai'

import { Graph, GraphNode } from '../../src/graph'
import { dijkstra, ShortestPath } from '../../src/algorithm/dijkstra'

describe.only('Dijkstra', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  it('Should return empty path if graph is empty', function () {
    const expected = new Map<GraphNode, number>()

    const result = dijkstra(graph, new GraphNode('0'))

    expect(result).deep.equal(expected)
  })

  it('Should return empty path if startNode not in graph', function () {
    const expected: ShortestPath = new Map()
    graph.addEdge('Node_0', 'Node_1')

    const shortestPath = dijkstra(graph, new GraphNode('0'))

    expect(shortestPath).deep.equal(expected)
  })

  it('Should return correct distance', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected = new Map<GraphNode, number>([
      [node1, 0],
      [node2, 1],
      [node3, 2],
      [node4, 5],
    ])
    graph.addEdge(node1, node2, {
      weight: 1,
    })
    graph.addEdge(node1, node3, {
      weight: 2,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
    })

    const shortestPath = dijkstra(graph, node1)

    let result = true
    for (let [node, { distance }] of shortestPath) {
      result = result && expected.get(node) === distance
    }
    expect(result).equal(true)
  })

  it('Should return correct distance to end node', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected = new Map<GraphNode, number>([
      [node1, 0],
      [node2, 1],
      [node3, 2],
      [node4, 6],
    ])
    graph.addEdge(node1, node2, {
      weight: 1,
    })
    graph.addEdge(node1, node3, {
      weight: 3,
    })
    graph.addEdge(node2, node3, {
      weight: 1,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
    })

    const shortestPath = dijkstra(graph, node1, node3)

    let result = true
    for (let [node, { distance }] of shortestPath) {
      result = result && expected.get(node) === distance
    }
    expect(result).equal(true)
  })

  it('Should return correct path', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected: ShortestPath = new Map([
      [node1, { distance: 0, path: [node1] }],
      [node2, { distance: 2, path: [node1, node2] }],
      [node3, { distance: 1, path: [node1, node3] }],
      [node4, { distance: 4, path: [node1, node3, node4] }],
    ])
    graph.addEdge(node1, node2, {
      weight: 2,
    })
    graph.addEdge(node1, node3, {
      weight: 1,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
    })

    const shortestPath = dijkstra(graph, node1)

    let result = true
    for (let [node, { path }] of shortestPath) {
      const eP = expected.get(node)?.path
      let pathEqual = eP ? true : false
      for (let i = 0; eP && i < eP.length; i++) {
        pathEqual = pathEqual && eP[i].isEqual(path[i])
      }
      result = result && pathEqual
    }
    expect(result).equal(true)
  })

  it('Should return correct path and distance', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected: ShortestPath = new Map([
      [node1, { distance: 0, path: [node1] }],
      [node2, { distance: 2, path: [node1, node2] }],
      [node3, { distance: 1, path: [node1, node3] }],
      [node4, { distance: 4, path: [node1, node3, node4] }],
    ])
    graph.addEdge(node1, node2, {
      weight: 2,
    })
    graph.addEdge(node1, node3, {
      weight: 1,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
    })

    const shortestPath = dijkstra(graph, node1)

    let result = true
    for (let [node, { distance, path }] of shortestPath) {
      const eP = expected.get(node)?.path
      let pathEqual = eP ? true : false
      for (let i = 0; eP && i < eP.length; i++) {
        pathEqual = pathEqual && eP[i].isEqual(path[i])
      }
      result = result && pathEqual && expected.get(node)?.distance === distance
    }
    expect(result).equal(true)
  })
})
