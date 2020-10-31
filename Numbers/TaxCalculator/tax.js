const BigNumber = require('bignumber.js')

exports.calculateCostWithTax = function (cost, tax) {
  return cost.plus(cost.times(tax)).toFixed()
}
