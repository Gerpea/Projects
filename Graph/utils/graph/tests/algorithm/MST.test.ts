import 'mocha'
import { expect } from 'chai'

import { Graph, GraphEdge, GraphNode } from '../../src/graph'
import { mst, MST } from '../../src/algorithm/mst'

describe.only('MST', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  it('Should return empty tree if graph is empty', function () {
    const expected: MST = { tree: new Graph(), cost: 0 }

    const tree = mst(graph, new GraphNode('0'))

    expect(tree).deep.equal(expected)
  })

  it('Should return empty tree if startNode not in graph', function () {
    const expected: MST = { tree: new Graph(), cost: 0 }
    graph.addEdge('Node_0', 'Node_1')

    const tree = mst(graph, new GraphNode('0'))

    expect(tree).deep.equal(expected)
  })

  it('Should work with directed edges', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected: MST = {
      tree: new Graph(),
      cost: 6,
    }
    expected.tree.addEdge(node1, node2, {
      weight: 1,
      directed: true,
    })
    expected.tree.addEdge(node1, node3, {
      weight: 2,
      directed: true,
    })
    expected.tree.addEdge(node3, node4, {
      weight: 3,
      directed: true,
    })
    graph.addEdge(node1, node2, {
      weight: 1,
      directed: true,
    })
    graph.addEdge(node1, node3, {
      weight: 2,
      directed: true,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
      directed: true,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
      directed: true,
    })

    const tree = mst(graph, node1)

    let result = tree.cost === expected.cost && tree.tree.edgesCount === expected.tree.edgesCount
    expect(result).equal(true)
  })

  it.only('Should work with undirected edges', function () {
    const node1 = new GraphNode('Node_1')
    const node2 = new GraphNode('Node_2')
    const node3 = new GraphNode('Node_3')
    const node4 = new GraphNode('Node_4')
    const expected: MST = {
      tree: new Graph(),
      cost: 6,
    }
    expected.tree.addEdge(node1, node2, {
      weight: 1,
      directed: true,
    })
    expected.tree.addEdge(node1, node3, {
      weight: 2,
      directed: true,
    })
    expected.tree.addEdge(node3, node4, {
      weight: 3,
      directed: true,
    })
    graph.addEdge(node1, node2, {
      weight: 1,
    })
    graph.addEdge(node1, node3, {
      weight: 2,
    })
    graph.addEdge(node3, node4, {
      weight: 3,
    })
    graph.addEdge(node2, node4, {
      weight: 5,
    })

    const tree = mst(graph, node1)

    let result = tree.cost === expected.cost && tree.tree.edgesCount === expected.tree.edgesCount
    expect(result).equal(true)
  })
})
