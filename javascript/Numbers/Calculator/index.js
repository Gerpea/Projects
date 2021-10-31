import { R_OK } from 'constants'
import calculate from './calculator'

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  if (input === 'q') {
    rl.close()
    return
  }

  console.log(`${calculate(input)}`)
})
