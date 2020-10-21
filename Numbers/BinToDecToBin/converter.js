const BigNumber = require('bignumber.js')

exports.binToDec = function (bin) {
  const length = new BigNumber(bin.length)
  let dec = new BigNumber(0)

  for (let i = length.minus(1); i.gte(0); i = i.minus(1)) {
    dec = dec.plus(new BigNumber(bin[i]).times(new BigNumber(2).pow(length.minus(i).minus(1))))
  }

  return dec.toFixed()
}

exports.decToBin = function (dec) {
  dec = new BigNumber(dec)
  let bin = ''
  while (!dec.eq(0)) {
    bin += dec.mod(2).toFixed().toString()
    dec = dec.idiv(2)
  }

  return bin.split('').reverse().join('')
}
