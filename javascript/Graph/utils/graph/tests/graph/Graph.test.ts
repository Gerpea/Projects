import 'mocha'
import { expect } from 'chai'

import { Graph, GraphEdge, GraphNode } from '../../src/graph'

describe('Graph', function () {
  describe('Node', function () {
    describe('Get node', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct node', function () {
        const expected = new GraphNode('node')

        graph.addNode(expected)
        const result = graph.getNode(expected)

        expect(result).equal(expected)
      })

      it('Should return correct node by value', function () {
        const expected = new GraphNode('node')
        graph.addNode(expected)

        const result = graph.getNode(expected.value)

        expect(result).equal(expected)
      })

      it('Should return undefined when node does not exist', function () {
        const expected = new GraphNode('node')
        graph.addNode(expected)

        const result = graph.getNode('anotherNode')

        expect(result).equal(undefined)
      })
    })

    describe('Add node', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should add node', function () {
        const expected = new GraphNode('node')

        graph.addNode(expected)

        const result = graph.getNode(expected.value)
        expect(result).equal(expected)
      })

      it('Should create node if value passed', function () {
        const expected = new GraphNode('node')

        graph.addNode(expected.value)

        const result = graph.getNode(expected.value)
        expect(expected.isEqual(result)).equal(true)
      })

      it('Should not add same node twice', function () {
        const nodeA = new GraphNode('node')
        const nodeB = new GraphNode('node')

        graph.addNode(nodeA)
        graph.addNode(nodeB)

        expect(graph.nodesCount).equal(1)
      })

      it('Should return created node', function () {
        const expected = new GraphNode('node')

        const result = graph.addNode(expected.value)

        expect(expected.isEqual(result)).equal(true)
      })
    })

    describe('Delete node', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return true when delete node', function () {
        const node = new GraphNode('node')
        graph.addNode(node)

        const result = graph.deleteNode(node)

        expect(result).equal(true)
      })

      it('Should return false when node does not exist', function () {
        graph.addNode('nodeA')

        const result = graph.deleteNode('nodeB')

        expect(result).equal(false)
      })

      it('Should delete edges to deleted node', function () {
        graph.addEdge('nodeA', 'nodeB')

        graph.deleteNode('nodeB')

        expect(graph.edgesCount).equal(0)
      })
    })
  })

  describe('Edge', function () {
    describe('Get edge', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct edge', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const expected = new GraphEdge(nodeB)
        graph.addEdge(nodeA, expected.node, {
          directed: false,
        })

        const result = graph.getEdge(nodeA, nodeB, {
          directed: false,
        })

        expect(expected.isEqual(result)).equal(true)
      })

      it('Should return undefined when edge not exist', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')

        const result = graph.getEdge(nodeA, nodeB)

        expect(result).equal(undefined)
      })

      it('Should work with NodeValue', function () {
        graph.addEdge('nodeA', 'nodeB')
        const result = graph.getEdge('nodeA', 'nodeB')

        expect(result).not.equal(undefined)
      })
    })

    describe('Get edges', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct number of edges', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        graph.addEdge(nodeA, nodeB)
        graph.addEdge(nodeA, nodeB, {
          weight: 1,
        })

        const result = graph.getEdges(nodeA, nodeB)

        expect(result.length).equal(2)
      })

      it('Should return correct edges', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const expected = [
          new GraphEdge(nodeB),
          new GraphEdge(nodeB, {
            weight: 1,
          }),
        ]
        for (let edge of expected) {
          graph.addEdge(nodeA, edge.node, edge.params)
        }

        const edges = graph.getEdges(nodeA, nodeB)

        let result = true
        for (let edge of expected) {
          result = result && edges.find((e) => e.isEqual(edge)) ? true : false
        }
        expect(result).equal(true)
      })

      it('Should return all edges from node', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const expected = [
          new GraphEdge(nodeB),
          new GraphEdge(nodeB, {
            weight: 1,
          }),
        ]
        for (let edge of expected) {
          graph.addEdge(nodeA, edge.node, edge.params)
        }

        const edges = graph.getEdges(nodeA)

        let result = true
        for (let edge of expected) {
          result = result && edges.find((e) => e.isEqual(edge)) ? true : false
        }
        expect(result).equal(true)
      })
    })

    describe('Add edge', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should create nodes if not exist', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')

        graph.addEdge(nodeA, nodeB)
        const result = graph.getNode(nodeA) !== undefined && graph.getNode(nodeB) !== undefined

        expect(result).equal(true)
      })

      it('Should increase in and out degree on nodes when create edge', function () {
        const expectedA = {
          inDegree: 1,
          outDegree: 1,
        }
        const expectedB = {
          inDegree: 1,
          outDegree: 1,
        }
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')

        graph.addEdge(nodeA, nodeB)

        const resultA = {
          inDegree: nodeA.inDegree,
          outDegree: nodeA.outDegree,
        }
        const resultB = {
          inDegree: nodeB.inDegree,
          outDegree: nodeB.outDegree,
        }
        expect(expectedA).deep.equal(resultA)
        expect(expectedB).deep.equal(resultB)
      })

      it('Should add edge', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')

        graph.addEdge(nodeA, nodeB, {
          directed: true,
        })

        expect(graph.edgesCount).equal(1)
      })

      it('Should return added edge', function () {
        const expected = new GraphEdge(new GraphNode('nodeB'), {
          directed: true,
        })
        const result = graph.addEdge('nodeA', expected.node, expected.params)

        expect(expected.isEqual(result)).equal(true)
      })

      it('Should add correct edge', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const expected = new GraphEdge(nodeB, {
          directed: true,
          weight: 1,
        })

        graph.addEdge(nodeA, expected.node, expected.params)
        const result = graph.getEdge(nodeA, nodeB, expected.params)

        expect(expected.isEqual(result)).equal(true)
      })

      it('Should add two edge in case of undirected edge', function () {
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const expected = new GraphEdge(nodeB, {
          directed: false,
          weight: 1,
        })

        graph.addEdge(nodeA, expected.node, expected.params)

        const edgeA = graph.getEdge(nodeA, nodeB, expected.params)
        const edgeB = graph.getEdge(nodeA, nodeB, expected.params)
        expect(edgeA).not.equal('undefined')
        expect(edgeB).not.equal('undefined')
      })
    })

    describe('Delete edge', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should delete edge', function () {
        const edge = new GraphEdge(new GraphNode('nodeB'), {
          directed: true,
        })
        const addedEdge = graph.addEdge('nodeA', edge.node, edge.params)

        graph.deleteEdge('nodeA', addedEdge)

        expect(graph.edgesCount).equal(0)
      })

      it('Should decrease in and out degree on nodes when delete edge', function () {
        const expectedA = {
          inDegree: 0,
          outDegree: 0,
        }
        const expectedB = {
          inDegree: 0,
          outDegree: 0,
        }
        const nodeA = new GraphNode('nodeA')
        const nodeB = new GraphNode('nodeB')
        const addedEdge = graph.addEdge(nodeA, nodeB)

        graph.deleteEdge(nodeA, addedEdge)

        const resultA = {
          inDegree: nodeA.inDegree,
          outDegree: nodeA.outDegree,
        }
        const resultB = {
          inDegree: nodeB.inDegree,
          outDegree: nodeB.outDegree,
        }
        expect(expectedA).deep.equal(resultA)
        expect(expectedB).deep.equal(resultB)
      })

      it('Should delete correct edge', function () {
        const edge = new GraphEdge(new GraphNode('nodeB'), {
          directed: true,
        })
        const addedEdge = graph.addEdge('nodeA', edge.node, edge.params)

        graph.deleteEdge('nodeA', addedEdge)

        const result = graph.getEdge('nodeA', addedEdge.node, addedEdge.params)
        expect(result).equal(undefined)
      })

      it('Should correctly delete undirected edge', function () {
        const edge = new GraphEdge(new GraphNode('nodeB'), {
          directed: false,
        })
        const addedEdge = graph.addEdge('nodeA', edge.node, edge.params)

        const result = graph.deleteEdge('nodeA', addedEdge)

        expect(graph.edgesCount).equal(0)
        expect(result).equal(true)
      })

      it('Should correctly delete two edge', function () {
        const edgeB = new GraphEdge(new GraphNode('nodeB'), {
          directed: true,
        })
        const edgeC = new GraphEdge(new GraphNode('nodeC'), {
          directed: true,
        })
        const addedEdgeB = graph.addEdge('nodeA', edgeB.node, edgeB.params)
        const addedEdgeC = graph.addEdge('nodeA', edgeC.node, edgeC.params)

        const result =
          graph.deleteEdge('nodeA', addedEdgeB) && graph.deleteEdge('nodeA', addedEdgeC)

        expect(graph.edgesCount).equal(0)
        expect(result).equal(true)
      })
    })

    describe('Delete edges', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should delete edges', function () {
        graph.addEdge('nodeA', 'nodeB', {
          directed: true,
        })
        graph.addEdge('nodeA', 'nodeC', {
          directed: true,
        })

        graph.deleteEdges('nodeA')

        expect(graph.edgesCount).equal(0)
      })
    })

    describe('Nodes count', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct count', function () {
        const expected = 10
        for (let i = 0; i < expected; i++) {
          graph.addNode(`Node_${i}`)
        }

        const result = graph.nodesCount

        expect(expected).equal(result)
      })
    })

    describe('Edges count', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct count', function () {
        const expected = 10
        for (let i = 0; i < expected; i++) {
          graph.addEdge(`Node_${i}`, `Node_${i + 1}`, {
            directed: true,
          })
        }

        const result = graph.edgesCount

        expect(expected).equal(result)
      })
    })

    describe('Get nodes', function () {
      let graph: Graph
      beforeEach(function () {
        graph = new Graph()
      })

      it('Should return correct nodes', function () {
        const expected: Array<GraphNode> = []
        for (let i = 0; i < 10; i++) {
          expected.push(graph.addNode(`Node_${i}`))
        }

        const nodes = graph.getNodes()

        let result = expected.length === nodes.length
        for (let node of nodes) {
          result = result && expected.find((n) => n.isEqual(node)) !== undefined
        }
        expect(result).equal(true)
      })
    })
  })
})
