import { model } from 'mongoose'

import indexSchema from './index.schema'
import logger from '../logger'

const IndexModel = model('Index', indexSchema)

async function updateIndex(indexName, fileId) {
  try {
    return await IndexModel.updateOne(
      { word: indexName },
      {
        $addToSet: {
          files: fileId,
        },
      },
      {
        upsert: true,
      }
    )
  } catch (e) {
    logger.error(`Cannot update index: ${e}`)
  }
}

async function getIndexesByWords(words) {
  try {
    const indexes = await IndexModel.find({
      word: { $in: words },
    })
    return indexes.reduce((value, index) => {
      return [
        ...value,
        {
          word: index.word,
          files: [...(value[index.word]?.files || []), ...index.files],
        },
      ]
    }, [])
  } catch (e) {
    logger.error(`Cannot get index: ${e}`)
  }
}

export { updateIndex, getIndexesByWords }
