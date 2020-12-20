import 'mocha'
import { expect } from 'chai'

import { Graph, GraphNode } from '../../src/graph'
import { eulerianPath, eulerianCycle } from '../../src/algorithm/eulerian'

describe('Eulerian', function () {
  let graph: Graph
  beforeEach(function () {
    graph = new Graph()
  })

  describe('Path', function () {
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
        new GraphNode('Node_0'),
        new GraphNode('Node_1'),
        new GraphNode('Node_2'),
        new GraphNode('Node_1'),
        new GraphNode('Node_3'),
        new GraphNode('Node_4'),
      ]
      for (let i = 0; i < expected.length - 1; i++) {
        graph.addEdge(expected[i], expected[i + 1], {
          directed: true,
        })
      }

      const path = eulerianPath(graph)

      let result = expected.length === path.length
      for (let i = 0; i < expected.length; i++) {
        result = result && expected[i].isEqual(path[i])
      }
      expect(result).equal(true)
    })
  })

  describe('Cycle', function () {
    it('Should return empty cycle if graph is empty', function () {
      const expected: Array<GraphNode> = []

      const result = eulerianCycle(graph)

      expect(result).deep.equal(expected)
    })

    it('Should return empty cycle when graph does not has eulerian cycle', function () {
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

      const result = eulerianCycle(graph)

      expect(result).deep.equal(expected)
    })

    it('Should return eulerian cycle', function () {
      const expected: Array<GraphNode> = [
        new GraphNode('Node_3'),
        new GraphNode('Node_4'),
        new GraphNode('Node_2'),
        new GraphNode('Node_1'),
        new GraphNode('Node_3'),
      ]
      graph.addEdge('Node_1', 'Node_2')
      graph.addEdge('Node_2', 'Node_4')
      graph.addEdge('Node_4', 'Node_3')
      graph.addEdge('Node_3', 'Node_1')

      const path = eulerianCycle(graph)

      let result = expected.length === path.length
      for (let i = 0; i < expected.length; i++) {
        result = result && expected[i].isEqual(path[i])
      }
      expect(result).equal(true)
    })
  })
})
