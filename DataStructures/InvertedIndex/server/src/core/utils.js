import fs from 'fs'
import natural from 'natural'
import { removeStopwords } from 'stopword'
import franc from 'franc-min'

const tokenizer = new natural.WordTokenizer()

function stem(words, language) {
  return words.map((word) => {
    let stemmer
    switch (language) {
      case 'deu':
        stemmer = natural.PorterStemmerNl
        break
      case 'fra':
        stemmer = natural.PorterStemmerFr
        break
      case 'ita':
        stemmer = natural.PorterStemmerIt
        break
      case 'nob':
        stemmer = natural.PorterStemmerNo
        break
      case 'por':
        stemmer = natural.PorterStemmerPt
        break
      case 'rus':
        stemmer = natural.PorterStemmerRu
        break
      case 'spa':
        stemmer = natural.PorterStemmerEs
        break
      case 'swe':
        stemmer = natural.PorterStemmerSv
        break
      case 'ind':
        stemmer = natural.StemmerId
        break
      case 'jpn':
        stemmer = natural.StemmerJa
        break
      default:
        stemmer = natural.PorterStemmer
        break
    }
    stemmer = stemmer ?? natural.PorterStemmer
    return stemmer.stem(word)
  })
}

async function getFileContent(filePath) {
  return await readFile(filePath)
}

async function getWords(content) {
  const language = 'und' //franc(content, { minLength: 10 })
  const words = stem(removeStopwords(tokenizer.tokenize(content) || []), language)
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
