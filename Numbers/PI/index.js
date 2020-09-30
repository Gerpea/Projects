/*
The digits of pi were computed using the Chudnovsky series 
It gives approximately 14 digits per term 
log(53360^3) / log(10)= 14.1816474627254776555

Algorithm description: https://bellard.org/pi/pi2700e9/pipcrecord.pdf
*/

const BigNumber = require('bignumber.js')
require('./bn')

const DIGITS = new BigNumber(30)

const A = new BigNumber('13591409')
const B = new BigNumber('545140134')
const C = new BigNumber('640320')
const D = new BigNumber('426880')
const E = new BigNumber('10005')
const DIGITS_PER_TERM = new BigNumber('14.181647462725477655') // log(53360^3) / log(10)
const C3_24 = C.pow(3).div(24)
const N = DIGITS.div(DIGITS_PER_TERM).integerValue(BigNumber.ROUND_CEIL)
const PREC = DIGITS.multipliedBy(new BigNumber(10).log(2))

BigNumber.config({
  DECIMAL_PLACES: Math.ceil(PREC.toNumber()), //digitPlace.toNumber() + 5,
  POW_PRECISION: Math.ceil(PREC.toNumber()), //digitPlace.toNumber() + 5,
})
;(async () => {
  const hrstart = process.hrtime()
  const PI = await compute_PI()
  const hrend = process.hrtime(hrstart)
  console.log(PI.toFixed(DIGITS.toNumber()))
  console.info(`Execution time (hr): ${hrend[0]}s ${hrend[1] / 1000000}ms`)
})()

async function compute_PQT(n1, n2) {
  let m = new BigNumber(0)
  let PQT = {
    P: new BigNumber(0),
    Q: new BigNumber(0),
    T: new BigNumber(0),
  }

  if (n1.plus(1).isEqualTo(n2)) {
    PQT.P = n2.multipliedBy(2).minus(1)
    PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(1))
    PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(5))
    PQT.Q = C3_24.multipliedBy(n2.pow(3))
    PQT.T = A.plus(B.multipliedBy(n2)).multipliedBy(PQT.P)
    if (PQT.T.isFinite()) {
      PQT.T = PQT.T.negated()
    }
  } else {
    m = n1.plus(n2).div(2)
    let res1 = await new Promise((resolve) =>
      setTimeout(async () => resolve(await compute_PQT(n1, m)), 0)
    )
    let res2 = await new Promise((resolve) =>
      setTimeout(async () => resolve(await compute_PQT(m, n2)), 0)
    )
    PQT.P = res1.P.multipliedBy(res2.P)
    PQT.Q = res1.Q.multipliedBy(res2.Q)
    PQT.T = res1.T.multipliedBy(res2.Q).plus(res1.P.multipliedBy(res2.T))
  }

  return PQT
}

async function compute_PI() {
  const PQT = await compute_PQT(new BigNumber(0), N)
  let PI = D.multipliedBy(E.sqrt()).multipliedBy(PQT.Q)
  PI = PI.div(A.multipliedBy(PQT.Q).plus(PQT.T))

  return PI
}
