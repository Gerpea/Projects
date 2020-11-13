const inquirer = require('inquirer')

const { Calculator } = require('./mortgage')
const { convertToBigNumber, displayBigNumber, shouldBeNumber } = require('./utils')

const bigNumberQuestion = {
  filter: convertToBigNumber,
  transformer: displayBigNumber,
  validate: shouldBeNumber,
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select a calculator',
      choices: [
        {
          name: 'Fixed rate',
          value: Calculator.Types.fixed,
        },
        {
          name: 'Compound rate',
          value: Calculator.Types.compound,
        },
      ],
    },
    {
      name: 'loan',
      message: 'Enter loan amount',
      ...bigNumberQuestion,
    },
    {
      name: 'r',
      message: 'Enter annualy interest rate in percent',
      ...bigNumberQuestion,
    },
    {
      name: 'terms',
      message: 'Enter months count',
      ...bigNumberQuestion,
    },
    {
      type: 'list',
      name: 'compound',
      message: 'Select compound interval',
      choices: [
        {
          name: 'Monthly',
          value: Calculator.CompoundIntervals.Monthly,
        },
        {
          name: 'Weekly',
          value: Calculator.CompoundIntervals.Weekly,
        },
        {
          name: 'Daily',
          value: Calculator.CompoundIntervals.Daily,
        },
        {
          name: 'Continually',
          value: Calculator.CompoundIntervals.Continually,
        },
      ],
      when: function (answers) {
        return answers.type === Calculator.Types.compound
      },
    },
  ])
  .then(function (answers) {
    const mortgage = new Calculator(answers.type, { ...answers, r: answers.r.div(100) })

    console.log(`Monthly payment: ${mortgage.monthlyPayment().toFixed(2)}`)
    console.log(`Months to repay: ${mortgage.howLong().toFixed(0)}`)
  })
