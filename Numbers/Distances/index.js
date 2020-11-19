const inquirer = require('inquirer')
const parseDMS = require('parse-dms')

const { distance } = require('./distance')

;(async () => {
  const fP = await getPoint()
  const sP = await getPoint()

  console.log(distance(fP, sP))
})()

async function getPoint() {
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
          name: 'Select from list',
          value: 'list',
        },
      ],
    },
    {
      name: 'dms',
      when: function (answers) {
        return answers.first === 'dms'
      },
      message: 'Enter DMS',
    },
  ])

  return parseDMS(answers.dms)
}
