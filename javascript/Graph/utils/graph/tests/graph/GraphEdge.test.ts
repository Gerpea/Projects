import 'mocha'
import { expect } from 'chai'

import { GraphEdge, GraphNode } from '../../src/graph'

describe('GraphEdge', function () {
  describe('Constructor', function () {
    it('Should correctly set weight', function () {
      const expected = 0
      const node = new GraphNode('node')
      const edge = new GraphEdge(node, {
        weight: 0,
      })

      expect(edge.weight).equal(expected)
    })

    it('Should correctly set direction', function () {
      const expected = true
      const node = new GraphNode('node')
      const edge = new GraphEdge(node, {
        directed: true,
      })

      expect(edge.directed).equal(expected)
    })
  })

  describe('IsEqual', function () {
    it('Same edge should be equal', function () {
      const node = new GraphNode('node')
      const edge = new GraphEdge(node)

      const result = edge.isEqual(edge)

      expect(result).equal(true)
    })

    it('Edges with same node and parameter should be equal', function () {
      const node = new GraphNode('node')
      const edgeA = new GraphEdge(node, {
        directed: true,
        weight: 1,
      })
      const edgeB = new GraphEdge(node, {
        directed: true,
        weight: 1,
      })

      const result = edgeA.isEqual(edgeB)

      expect(result).equal(true)
    })

    it('Edges with different node should not be equal', function () {
      const nodeA = new GraphNode('nodeA')
      const nodeB = new GraphNode('nodeB')
      const edgeA = new GraphEdge(nodeA)
      const edgeB = new GraphEdge(nodeB)

      const result = edgeA.isEqual(edgeB)

      expect(result).equal(false)
    })

    it('Edges with different params should not be equal', function () {
      const node = new GraphNode('node')
      const edgeA = new GraphEdge(node, {
        directed: true,
        weight: 1,
      })
      const edgeB = new GraphEdge(node, {
        directed: false,
        weight: 1,
      })

      const result = edgeA.isEqual(edgeB)

      expect(result).equal(false)
    })

    it('Should return false for any other values that GraphEdge', function () {
      const node = new GraphNode('node')
      const edgeA = new GraphEdge(node, {
        directed: true,
        weight: 1,
      })
      const edgeB = undefined

      const result = edgeA.isEqual(edgeB)

      expect(result).equal(false)
    })
  })
})
