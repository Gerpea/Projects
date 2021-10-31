const BigNumber = require('bignumber.js')

exports.nextPrime = function (n) {
  let i = n
  while (i) {
    i = i.plus(1)
    if (isPrime(i)) {
      return i
    }
  }
}

function isPrime(n) {
  let c = {}
  c[new BigNumber(0)] = new BigNumber(1)
  for (let i = new BigNumber(0); i.lt(n); i = i.plus(1)) {
    c[i.plus(1)] = new BigNumber(1)
    for (let j = i; j.gt(0); j = j.minus(1)) {
      c[j] = c[j.minus(1)].minus(c[j])
    }
    c[new BigNumber(0)] = c[new BigNumber(0)].negated()
  }

  c[new BigNumber(0)] = c[new BigNumber(0)].plus(1)
  c[new BigNumber(n)] = c[new BigNumber(n)].minus(1)

  for (let i = n; i.gte(0); i = i.minus(1)) {
    if (!c[i].modulo(n).isEqualTo(0)) {
      return false
    }
  }

  return true
}
