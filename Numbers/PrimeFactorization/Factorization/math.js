const BigNumber = require('bignumber.js')

var BN1 = new BigNumber(1),
  BN0 = new BigNumber(0),
  BN2 = new BigNumber(2),
  BN3 = new BigNumber(3)

function BNegcd(x, y) {
  if (typeof x == 'number') {
    x = new BigNumber(x)
  }
  if (typeof y == 'number') {
    y = new BigNumber(y)
  }
  if (!(x instanceof BigNumber && y instanceof BigNumber)) {
    throw new Error('BNegcd called on non-BigNumber')
  }
  let a0 = BN1,
    a1 = BN0,
    b0 = BN0,
    b1 = BN1,
    a2 = x,
    b2 = y,
    q,
    z
  while (!b2.eq(0)) {
    q = a2.idiv(b2)
    z = a0.minus(q.times(b0))
    a0 = b0
    b0 = z
    z = a1.minus(q.times(b1))
    a1 = b1
    b1 = z
    z = a2.minus(q.times(b2))
    a2 = b2
    b2 = z
  }
  if (a2.lte(0)) {
    ;(a1 = a1.negated()), (a2 = a2.negated())
  }
  return [a0, a1, a2]
}

function BNgcd(a, b) {
  a = new BigNumber(a)
  b = new BigNumber(b)
  if (a.isInteger() && b.isInteger()) {
    return BNegcd(a.eq(0) ? BN1 : a.abs(), b.eq(0) ? BN1 : b.abs())[2]
  } else {
    throw new Error('GCD can be called only with integers')
  }
}

function BNrandomInt(lo, hi, width) {
  if (typeof lo == 'number') {
    lo = new BigNumber(lo)
  }
  if (typeof hi == 'number') {
    hi = new BigNumber(hi)
  }
  if (!width) {
    width = 20
  }

  if (hi.lte(lo)) {
    throw new Error('Random int arguments: lo must be less than hi')
  }
  let r
  do {
    r = BigNumber.random(width)
      .times(hi.minus(lo).plus(1))
      .plus(lo)
      .integerValue(BigNumber.ROUND_DOWN)
  } while (r.gt(hi))

  return r
}

module.exports = { BNgcd, BNrandomInt, BN0, BN1, BN2, BN3 }
