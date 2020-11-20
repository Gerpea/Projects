const { BN0, BN1, BN2, BN3 } = require('./math')

exports.trialFactorize = function (number, all) {
  if (all) {
    return trialDivisionAll(number)
  } else {
    const factor = trialDivision(number)
    return [factor, number.idiv(factor)]
  }
}

function trialDivisionAll(n) {
  let factors = []
  while (n.mod(BN2).eq(BN0)) {
    factors.push(BN2)
    n = n.idiv(BN2)
  }
  let f = BN3
  while (f.times(f).lte(n)) {
    if (n.mod(f).eq(BN0)) {
      factors.push(f)
      n = n.idiv(f)
    } else {
      f = f.plus(BN2)
    }
  }

  if (!n.eq(BN1)) {
    factors.push(n)
  }

  return factors
}

function trialDivision(n) {
  if (n.eq(BN1)) {
    return n
  }
  if (n.mod(BN2).eq(BN0)) {
    return BN2
  }

  let f = BN3
  while (f.times(f).lte(n)) {
    if (n.mod(f).eq(BN0)) {
      return f
    } else {
      f = f.plus(BN2)
    }
  }
}
