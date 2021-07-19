const assert = require('chai').assert
const { convert } = require('../names')

describe('operations', function () {
  describe('#convert()', function () {
    describe('one digit', function () {
      it('should return minus one when value is -1', function () {
        assert.strictEqual(convert('-1'), 'minus one')
      })
      it('should return minus one when value is +1', function () {
        assert.strictEqual(convert('+1'), 'plus one')
      })
    })
    describe('two digit', function () {
      it('should return three point fourteen when value is 3.14', function () {
        assert.strictEqual(convert('3.14'), 'three point fourteen')
      })
    })
    describe('expression', function () {
      it('should return minus three point fourteen when value is 3.14', function () {
        assert.strictEqual(convert('-3.14'), 'minus three point fourteen')
      })
      it('should return one plus two when value is 1+2', function () {
        assert.strictEqual(convert('1+2'), 'one plus two')
      })
      it('should return one plus two when value is 1 + 2', function () {
        assert.strictEqual(convert('1 + 2'), 'one plus two')
      })
      it('should return one times two when value is 1*2', function () {
        assert.strictEqual(convert('1*2'), 'one times two')
      })
      it('should return one over two when value is 1/2', function () {
        assert.strictEqual(convert('1/2'), 'one over two')
      })
    })
  })
})
