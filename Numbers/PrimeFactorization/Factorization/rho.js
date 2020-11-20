const BigNumber = require('bignumber.js')
const { BNrandomInt, BNgcd, BN0, BN1, BN2 } = require('./math')

exports.rhoFactorize = function (number, all) {
  if (all) {
    return rhoAll(number)
  } else {
    const factor = rho(number)
    return [factor, number.idiv(factor)]
  }
}

function rhoAll(n) {
  let factors = []

  if (n.eq(BN1)) {
    return [n]
  }

  while (!isPrime(n)) {
    if (n.mod(BN2).eq(BN0)) {
      factors.push(BN2)
      n = n.idiv(BN2)
    } else {
      const f = rho(n)
      factors.push(f)
      n = n.idiv(f)
    }
  }

  factors.push(n)
  return factors
}

function rho(n) {
  if (n.eq(BN1)) {
    return n
  }
  if (n.mod(BN2).eq(BN0)) {
    return BN2
  }

  let x = BNrandomInt(BN2, n)
  let y = x
  let c = BNrandomInt(BN1, n)
  let d = BN1

  while (d.eq(BN1)) {
    x = modularPow(x, BN2, n).plus(c).plus(n).mod(n)

    y = modularPow(y, BN2, n).plus(c).plus(n).mod(n)
    y = modularPow(y, BN2, n).plus(c).plus(n).mod(n)

    d = BNgcd(x.minus(y).abs(), n)

    if (d.eq(n)) {
      return rho(n)
    }
  }

  return d
}

function modularPow(base, exponent, modulus) {
  let result = BN1

  base = new BigNumber(base)
  exponent = new BigNumber(exponent)
  modulus = new BigNumber(modulus)

  while (exponent.gt(BN0)) {
    if (!exponent.mod(BN2).eq(BN0)) {
      result = result.times(base).mod(modulus)
    }

    exponent = exponent.idiv(BN2)
    base = base.times(base).mod(modulus)
  }

  return result
}

function isPrime(n) {
  let c = {}
  c[BN0] = BN1
  for (let i = BN0; i.lt(n); i = i.plus(BN1)) {
    c[i.plus(BN1)] = new BigNumber(BN1)
    for (let j = i; j.gt(BN0); j = j.minus(BN1)) {
      c[j] = c[j.minus(BN1)].minus(c[j])
    }
    c[BN0] = c[BN0].negated()
  }

  c[BN0] = c[BN0].plus(BN1)
  c[new BigNumber(n)] = c[new BigNumber(n)].minus(BN1)

  for (let i = n; i.gte(BN0); i = i.minus(BN1)) {
    if (!c[i].modulo(n).isEqualTo(BN0)) {
      return false
    }
  }

  return true
}
