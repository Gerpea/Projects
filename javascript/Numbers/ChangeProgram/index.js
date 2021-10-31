const program = require('commander')

const { getChange, getCoins } = require('./change')

program
  .requiredOption('-c, --cost <number>', 'Cost')
  .requiredOption('-m, --money <number>', 'Amount of money')

program.parse(process.argv)
;(() => {
  const cost = program.cost
  const money = program.money

  const change = getChange(cost, money)
  const { quaters, dimes, nickels, pennies } = getCoins(change)

  console.log(`Change: ${change.toString()}`)
  console.log(`Quaters: ${quaters}, Dimes: ${dimes}, Nickels: ${nickels}, Pennies: ${pennies}`)
})()
