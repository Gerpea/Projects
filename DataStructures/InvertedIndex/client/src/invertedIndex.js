import tokenizer from 'wink-tokenizer'
import sw from 'stopword'

import { readFile } from './utils'

class InvertedIndex {
  constructor() {
    this._index = new Map()
    this._tokenizer = tokenizer()
  }

  async addFile(file) {
    console.log(await this._getWords(file))
  }

  removeFile(file) {}

  search(value) {}

  async _getWords(file) {
    // return this._tokenizer.tokenize(await readFile(file)).filter(function (token) {
    //   return token.tag !== 'punctuation'
    // })
    return sw.removeStopwords(
      this._tokenizer
        .tokenize(await readFile(file))
        .filter(function (token) {
          return token.tag !== 'punctuation' && token.tag !== 'symbol'
        })
        .map(function (token) {
          return token.value
        })
    )
  }
}

export { InvertedIndex }
