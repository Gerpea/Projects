const BigNumber = require('bignumber.js')

exports.getCoins = function (change) {
  if (typeof change == 'number' || typeof change == 'string') {
    change = new BigNumber(change)
  }

  const coins = change.minus(change.toFixed(0, 1)).times(100)

  return {
    quaters: coins.idiv(25).toString(),
    dimes: coins.mod(25).idiv(10).toString(),
    nickels: coins.mod(25).mod(10).idiv(5).toString(),
    pennies: coins.mod(25).mod(10).mod(5).toFixed(0, 1).toString(),
  }
}

exports.getChange = function (cost, money) {
  if (typeof cost == 'number' || typeof cost == 'string') {
    cost = new BigNumber(cost)
  }

  if (typeof money == 'number' || typeof money == 'string') {
    money = new BigNumber(money)
  }

  return money.minus(cost)
}
