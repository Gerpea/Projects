const BigNumber = require('bignumber.js')

BigNumber.prototype.factorial = function () {
  var f = new BigNumber(1)
  for (var i = 1; this.gte(i); i++) f = f.times(i)
  return f
}

const THREE = new BigNumber(3)

exports.computeE = function (digits) {
  BigNumber.config({
    DECIMAL_PLACES: digits + 1,
  })

  let terms = digits / 3
  let e = new BigNumber(0)
  for (let i = new BigNumber(0); i.lte(terms); i = i.plus(1)) {
    e = e.plus(THREE.times(i).pow(2).plus(1).div(THREE.times(i).factorial()))
  }

  return e.toFixed(digits)
}
