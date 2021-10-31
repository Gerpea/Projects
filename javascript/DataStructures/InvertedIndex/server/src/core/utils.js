import fs from 'fs'
import natural from 'natural'
import { removeStopwords } from 'stopword'

const tokenizer = new natural.WordTokenizer()

function stem(words) {
  return words.map((word) => {
    return natural.PorterStemmer.stem(word)
  })
}

async function getFileContent(filePath) {
  return await readFile(filePath)
}

async function getWords(content) {
  const words = stem(removeStopwords(tokenizer.tokenize(content) || []))
  return words
}

async function readFile(filePath) {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  )
}

export { getWords, getFileContent }
