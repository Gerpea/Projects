const BigNumber = require('bignumber.js')

exports.calculateFibonacciNumber = function (n, cb, every = true) {
  if (n.lte(0)) {
    return
  }

  let a = new BigNumber(0)
  let b = new BigNumber(1)
  let c = new BigNumber(0)

  for (let i = 2; i <= n; i++) {
    if (every) {
      cb?.apply(this, [c.toString()])
    }
    c = a.plus(b)
    a = b
    b = c
  }

  cb?.apply(this, [c.toString()])
}
