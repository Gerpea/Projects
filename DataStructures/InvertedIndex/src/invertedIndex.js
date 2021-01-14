import { readFile } from './utils'

class InvertedIndex {
  constructor() {
    this._index = new Map()
  }

  async addFile(file) {
    console.log(await this._getWords(file))
  }

  removeFile(file) {}

  search(value) {}

  async _getWords(file) {
    return await readFile(file)
  }
}

export { InvertedIndex }
