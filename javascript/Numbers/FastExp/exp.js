const BigNumber = require('bignumber.js')

exports.power = function (x, y) {
  let result = new BigNumber(1)
  x = new BigNumber(x)
  y = new BigNumber(y)

  while (y.gt(0)) {
    if (y.mod(2).eq(1)) {
      result = result.times(x)
    }

    y = y.idiv(2)
    x = x.times(x)
  }

  return result.toFixed()
}
