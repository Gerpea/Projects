import { basicLatin, supplementLatin } from './latin'

const tables = [basicLatin, supplementLatin]

function find(charCode) {
  for (const table of tables) {
    for (let block of Object.keys(table)) {
      if (table[block].indexOf(charCode) !== -1) {
        return table[block]
      }
    }
  }
}

export { find }
