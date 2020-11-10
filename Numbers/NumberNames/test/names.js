const assert = require('chai').assert
const { convert } = require('../names')

describe('names', function () {
  describe('#convert()', function () {
    describe('one digit', function () {
      it('should return one when value is 1', function () {
        assert.strictEqual(convert('1'), 'one')
      })

      it('should return two when value is 2', function () {
        assert.strictEqual(convert('2'), 'two')
      })
    })

    describe('two digits', function () {
      it('should return twelve when value is 12', function () {
        assert.strictEqual(convert('12'), 'twelve')
      })

      it('should return thirty when value is 30', function () {
        assert.strictEqual(convert('30'), 'thirty')
      })

      it('should return twenty one when value is 21', function () {
        assert.strictEqual(convert('21'), 'twenty one')
      })

      it('should return ninety nine one when value is 99', function () {
        assert.strictEqual(convert('99'), 'ninety nine')
      })
    })

    describe('three digits', function () {
      it('should return one hundred when value is 100', function () {
        assert.strictEqual(convert('100'), 'one hundred')
      })

      it('should return one hundred seven when value is 107', function () {
        assert.strictEqual(convert('107'), 'one hundred seven')
      })

      it('should return one hundred eleven when value is 111', function () {
        assert.strictEqual(convert('111'), 'one hundred eleven')
      })

      it('should return one hundred ninety eight when value is 198', function () {
        assert.strictEqual(convert('198'), 'one hundred ninety eight')
      })

      it('should return five hundred when value is 500', function () {
        assert.strictEqual(convert('500'), 'five hundred')
      })

      it('should return five hundred ninety eight when value is 598', function () {
        assert.strictEqual(convert('598'), 'five hundred ninety eight')
      })
    })

    describe.only('four digit', function () {
      it('should return one thousand when value is 1000', function () {
        assert.strictEqual(convert('1000'), 'one thousand')
      })

      it('should return one thousand seven when value is 1007', function () {
        assert.strictEqual(convert('1007'), 'one thousand seven')
      })

      it('should return one thousand eleven when value is 1011', function () {
        assert.strictEqual(convert('1011'), 'one thousand eleven')
      })

      it('should return one thousand ninety eight when value is 1098', function () {
        assert.strictEqual(convert('1098'), 'one thousand ninety eight')
      })

      it('should return five thousand when value is 5000', function () {
        assert.strictEqual(convert('5000'), 'five thousand')
      })

      it('should return five thousand ninety eight when value is 5098', function () {
        assert.strictEqual(convert('5098'), 'five thousand ninety eight')
      })

      it('should return five thousand four hundred ninety eight when value is 5498', function () {
        assert.strictEqual(convert('5498'), 'five thousand four hundred ninety eight')
      })

      it('should return eleven thousand four hundred ninety eight when value is 11498', function () {
        assert.strictEqual(convert('11498'), 'eleven thousand four hundred ninety eight')
      })
    })
  })
})
