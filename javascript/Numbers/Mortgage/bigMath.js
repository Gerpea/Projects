const BigNumber = require('bignumber.js')

const BNe = new BigNumber(
  '2.718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011'
)
const BN1 = new BigNumber(1)

function BNdps() {
  return BigNumber.config().DECIMAL_PLACES
}

function BNpow(b, p) {
  if (typeof b == 'number' || typeof b == 'string') {
    b = new BigNumber(b)
  }
  if (!(b instanceof BigNumber)) {
    throw new Error('To-Power has wrong type of base value ' + typeof b)
  }
  if (typeof p == 'number' || typeof p == 'string') {
    p = new BigNumber(p)
  }
  if (!(p instanceof BigNumber)) {
    throw new Error('To-power has wrong type of power value ' + typeof p)
  }

  let ans
  if (p.isInteger()) {
    ans = b.pow(p)
  } else {
    ans = BNEpow(BNlog(b).times(p))
  }
  return ans
}

function BNlog(x) {
  if (typeof x == 'number' || typeof x == 'string') {
    x = new BigNumber(x)
  }
  let xIN = x,
    mant = 0,
    e = BNEpow(1),
    epow,
    pow = 0,
    z,
    L
  if (x.isNegative()) {
    throw new Error('Cannot take the log of a negative number: ' + x)
  } else if (x.isZero()) {
    L = BN1
  } else {
    if (x.gt(e)) {
      pow = -1
      epow = BN1
      while ((z = epow.times(e)).lt(x)) {
        epow = z
        pow++
      }
      x = x.div(epow)
      pow++
    }
    if (x.lt(BN1)) {
      pow = 0
      epow = e
      while (x.times(epow).lt(1)) {
        pow--
        epow = epow.times(e)
      }
      x = x.times(epow)
      pow--
    }
    var y = x.minus(1).div(x.plus(1))
    var ysqr = y.sqrt(),
      term = y,
      i = 1,
      zero = new BigNumber('1e-' + (BNdps() + 9))

    L = y

    while (term.gt(zero)) {
      i += 2
      term = term.times(ysqr)
      L = L.plus(term.div(i))
    }
    L = L.times(2).plus(pow)
  }
  return L
}

function BNEpow(x) {
  if (typeof x == 'number' || typeof x == 'string') x = new BigNumber(x)
  if (!(x instanceof BigNumber))
    throw new Error('E to power has wrong type of power value ' + typeof x)

  var term = BN1,
    ans = BN1,
    i = 0,
    zero = new BigNumber('1e-' + (BNdps() + 5)),
    sgn
  if (x.isNegative()) {
    sgn = -1
    x = x.negated()
  } else {
    sgn = 1
  }
  while (term.abs().gt(zero) && i < 500) {
    i++
    term = term.times(x).div(i)
    ans = ans.plus(term)
  }
  return sgn < 0 ? BN1.div(ans) : ans
}

BigNumber.prototype.topow = function (p) {
  return BNpow(this, p)
}

BigNumber.prototype.log = function (base) {
  return arguments.length == 0 ? BNlog(this) : BNlog(this).div(BNlog(base))
}

module.exports = { BNe, BN1 }
