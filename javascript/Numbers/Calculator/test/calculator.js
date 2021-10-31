const assert = require('chai').assert

const { calculate } = require('../calculator')

describe('Calculator', function () {
  describe('#calculate()', function () {
    describe('Basic', function () {
      const tests = [
        { args: ['2 + 2'], expected: '4' },
        { args: ['2.2 + 2.2'], expected: '4.4' },
        { args: ['4 - 2'], expected: '2' },
        { args: ['4.3 - 2.1'], expected: '2.2' },
        { args: ['4 * 2'], expected: '8' },
        { args: ['4.3 * 2.1'], expected: '9.03' },
        { args: ['4 / 2'], expected: '2' },
        { args: ['4.2 / 2.1'], expected: '2' },
        { args: ['2 * 4 / 2 + 1.2 - 2.1'], expected: '3.1' },
      ]

      tests.forEach(function (test) {
        it(`Should correctly calculate ${test.args[0]}`, function () {
          const actual = calculate.apply(null, test.args)
          assert.strictEqual(actual, test.expected)
        })
      })
    })

    describe('Order', function () {
      const tests = [
        { args: ['2 + 2 * 2'], expected: '6' },
        { args: ['2 + 2 / 2'], expected: '3' },
        { args: ['(2 + 2) * 2'], expected: '8' },
        { args: ['(2 + 2) / 2'], expected: '2' },
        { args: ['(2 + 2) / 2 * (2 + 1)'], expected: '6' },
      ]

      tests.forEach(function (test) {
        it(`Should correctly calculate ${test.args[0]}`, function () {
          const actual = calculate.apply(null, test.args)
          assert.strictEqual(actual, test.expected)
        })
      })
    })
  })
})
