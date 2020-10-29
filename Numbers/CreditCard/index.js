const program = require('commander')

const { chekCard } = require('./card')

program.requiredOption('-c, --card <string>', 'credit card number')

program.parse(process.argv)
;(() => {
  const cardNumber = program.card.replace(/[^\d]/g, '')

  const npstart = process.hrtime()
  const isValid = chekCard(cardNumber)
  const npend = process.hrtime(npstart)

  console.log(`The card is ${isValid ? 'valid' : 'not valid'}`)
  console.info(`Execution time (hr): ${npend[0]}s ${npend[1] / 1000000}ms`)
})()
