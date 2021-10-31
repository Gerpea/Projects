const inquirer = require('inquirer')
const parseDMS = require('parse-dms')

const { getCities } = require('./geodb')
const { units } = require('./convert')

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete'))

exports.getPoint = async function () {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'point',
      message: 'Select point',
      choices: [
        {
          name: 'Enter DMS',
          value: 'dms',
        },
        {
          name: 'From list',
          value: 'list',
        },
      ],
    },
    {
      name: 'dms',
      when: function (answers) {
        return answers.point === 'dms'
      },
      message: 'Enter DMS',
    },
    {
      name: 'dms',
      when: function (answers) {
        return answers.point === 'list'
      },
      type: 'autocomplete',
      message: 'Select a city',
      source: async function (_, input) {
        const res = await getCities(input)
        return res.map(function (city) {
          return { name: city.name, value: `${city.latitude} ${city.longitude}` }
        })
      },
    },
  ])

  return parseDMS(answers.dms)
}

exports.getUnit = async function () {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'unit',
      message: 'Select unit',
      choices: Object.keys(units),
    },
  ])

  return answers.unit
}
