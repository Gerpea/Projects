import fs from 'fs'
import formidable from 'formidable'

import { createFile, getFileById } from './file/file.model'
import { updateIndex } from './index/index.model'
import { getWords, getFileContent } from './core/utils'
import { filesDir } from './const'

async function readFirstNBytes(path, n) {
  let chunks = ''
  for await (let chunk of fs.createReadStream(path, { start: 0, end: n, encoding: 'utf8' })) {
    chunks += chunk
  }
  return chunks
}

export default {
  getFileById: {
    path: '/api/file/:id',
    listener: async (req, res, next) => {
      const { id } = req.params
      const file = await getFileById(id)

      let data = {
        name: file.name,
        description: await readFirstNBytes(`${filesDir}/${id}`, 80),
        timestamp: file.timestamp,
        id: file._id,
      }
      res.json(data)
    },
  },
  createFile: {
    path: '/api/files',
    listener: (req, res, next) => {
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, _, files) => {
        if (err) {
          next(err)
          return
        }
        const oldpath = files.file.path
        const fileId = await createFile(files.file)
        if (fileId) {
          const newpath = `${filesDir}/${fileId}`
          if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir, { recursive: true })
          }
          fs.rename(oldpath, newpath, async (err) => {
            if (err) throw err
            res.json({ id: fileId })
            const words = await getWords(await getFileContent(newpath))
            words.forEach(async (word) => {
              await updateIndex(word, fileId)
            })
          })
        } else {
          res.end('Error')
        }
      })
    },
  },
}
