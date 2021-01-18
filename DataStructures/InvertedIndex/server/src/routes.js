import path from 'path'
import fs from 'fs'
import formidable from 'formidable'

import { createFile } from './file/file.model'

const filesDir = path.resolve(`${__dirname}/files`)

export default {
  getFileById: {
    path: '/api/file/:id',
    listener: (req, res) => {
      const { id } = req.url.params
      fs.readFile(`${filesDir}/${id}`, function (err, data) {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
        res.writeHead(200)
        res.end(data)
      })
    },
  },
  createFile: {
    path: '/api/files',
    listener: (req, res) => {
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, fields, files) => {
        const oldpath = files.file.path
        const fileId = await createFile(files.file)
        if (fileId) {
          const newpath = `${filesDir}/${fileId}`
          if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir)
          }
          fs.rename(oldpath, newpath, (err) => {
            if (err) throw err
            res.end(JSON.stringify({ id: fileId }))
          })
        } else {
          res.end('Error')
        }
      })
    },
  },
}
