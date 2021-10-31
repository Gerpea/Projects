import inquirer from 'inquirer'

async function getInput(message: string) {
  const answers = await inquirer.prompt([
    {
      name: 'userInput',
      message: message,
    },
  ])

  return answers.userInput
}

export { getInput }
