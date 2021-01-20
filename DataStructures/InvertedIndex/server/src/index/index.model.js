import { model } from 'mongoose'
import indexSchema from './index.schema'

const IndexModel = model('Index', indexSchema)

async function updateIndex(indexName, fileId) {
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
}

async function getFilesIdsByIndexes(words) {
  const indexes = await IndexModel.find({
    word: { $in: words },
  })
  return indexes.reduce((value, index) => {
    return [...value, ...index.files]
  }, [])
}

export { updateIndex, getFilesIdsByIndexes }
