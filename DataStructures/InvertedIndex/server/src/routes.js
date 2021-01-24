import fs from 'fs'
import formidable from 'formidable'
import { StatusCodes } from 'http-status-codes'

import { createFile, getFileById } from './file/file.model'
import { updateIndex } from './index/index.model'
import { getWords, getFileContent } from './core/utils'
import { filesDir } from './const'
import logger from './logger'

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
    listener: async (req, res) => {
      const { id } = req.params
      const file = await getFileById(id)

      try {
        if (file) {
          let data = {
            name: file.name,
            description: await readFirstNBytes(`${filesDir}/${id}`, 80),
            timestamp: file.timestamp,
            id: file._id,
          }
          res.json(data)
        } else {
          logger.info(`getFileById ${id} not found`)
          res.status(StatusCodes.NOT_FOUND).json({ message: `File with id: ${id} not found.` })
        }
      } catch (e) {
        logger.error(`getFileById error: ${e}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
      }
    },
  },
  createFile: {
    path: '/api/files',
    listener: (req, res) => {
      const form = new formidable.IncomingForm()
      form.parse(req, async (e, _, files) => {
        if (e) {
          logger.error(`Incoming file parse error: ${e}`)
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
          return
        }
        const oldpath = files.file.path
        const fileId = await createFile(files.file)
        if (fileId) {
          try {
            const newpath = `${filesDir}/${fileId}`
            if (!fs.existsSync(filesDir)) {
              fs.mkdirSync(filesDir, { recursive: true })
            }
            fs.rename(oldpath, newpath, async (e) => {
              if (e) {
                logger.error(`File rename error: ${e}`)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
                return
              }
              res.json({ id: fileId })

              const words = await getWords(await getFileContent(newpath))
              words.forEach(async (word) => {
                await updateIndex(word, fileId)
              })
            })
          } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
          }
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json()
        }
      })
    },
  },
}
