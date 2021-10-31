const BigNumber = require('bignumber.js')

function computeFactorial(n) {
  n = new BigNumber(n)
  if (!n.isInteger() || n.lt(0)) {
    return new BigNumber(-1)
  }
  let result = new BigNumber(1)
  for (let i = result; i.lte(n); i = i.plus(1)) {
    result = result.times(i)
  }

  return result
}

async function computeFactorialRecursive(n) {
  n = new BigNumber(n)
  if (!n.isInteger() || n.lt(0)) {
    return new BigNumber(-1)
  }

  if (n.eq(0)) {
    return new BigNumber(1)
  }

  return n.times(
    await new Promise((resolve) =>
      process.nextTick(async () => resolve(await computeFactorialRecursive(n.minus(1))))
    )
  )
}

module.exports = { computeFactorial, computeFactorialRecursive }
