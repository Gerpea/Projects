const BigNumber = require('bignumber.js')

const { rhoFactorize } = require('./rho')
const { trialFactorize } = require('./trial')

const Methods = Object.freeze({
  rho: 'rho',
  trial: 'trialDivision',
})

function factorize(method, number, all = false) {
  const n = new BigNumber(number)
  switch (method) {
    case Methods.rho:
      return rhoFactorize(n, all)
    case Methods.trial:
      return trialFactorize(n, all)
    default:
      throw new Error(`Can't with these method: ${method}`)
  }
}

module.exports = { factorize, Methods }
