const BigNumber = require('bignumber.js')

const Coin = Object.freeze({
  Tail: 'T',
  Head: 'H',
})

function flipCoin() {
  return Math.random() > 0.5 ? Coin.Head : Coin.Tail
}

function flipCoinNTimes(times, cb) {
  for (let i = new BigNumber(0); i.lt(times); i = i.plus(1)) {
    cb?.apply(this, [flipCoin()])
  }
}

module.exports = { Coin, flipCoin, flipCoinNTimes }
