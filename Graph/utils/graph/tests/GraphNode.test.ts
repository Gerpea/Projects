import 'mocha'
import { expect } from 'chai'

import { GraphNode } from '../src/gra'

describe('GraphNode', function () {
  describe('IsEqual', function () {
    it('Same node should be equal', function () {
      const node = new GraphNode('node')

      const result = node.isEqual(node)

      expect(result).equal(true)
    })

    it('Nodes with same value should be equal', function () {
      const nodeA = new GraphNode('node')
      const nodeB = new GraphNode('node')

      const result = nodeA.isEqual(nodeB)

      expect(result).equal(true)
    })

    it('Nodes with different value should not be equal', function () {
      const nodeA = new GraphNode('nodeA')
      const nodeB = new GraphNode('nodeB')

      const result = nodeA.isEqual(nodeB)

      expect(result).equal(false)
    })

    it('Should handle any values', function () {
      const nodeA = new GraphNode('nodeA')

      const result = nodeA.isEqual('nodeA')

      expect(result).equal(true)
    })
  })
})
