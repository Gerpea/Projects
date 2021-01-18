import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

import { Server } from './core'
import dbConnect from './db'

const pid = process.pid

const hostname = process.env.HOSTNAME || '127.0.0.1'
const port = process.env.PORT || 3000

const server = new Server()

server.get('/api/file/:id', (req, res) => {
  console.log(req.url.params)
  res.end(JSON.stringify(req.url))
})

server.post('/api/files', (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    const oldpath = files.filetoupload.path
    const newpath = path.resolve(`${__dirname}/files`)
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err
      res.end('File uploaded and moved')
    })
  })
  res.end(JSON.stringify(req.url))
})

dbConnect()
  .then(() => {
    server.listen(
      () => {
        console.log(`[Info]: Server running at http://${hostname}:${port}/ with pid: ${pid}`)
      },
      port,
      hostname
    )
  })
  .catch(() => {
    console.log('[Error]: Cannot connect to db')
    process.exit(0)
  })

process.on('beforeExit', () => {
  server.close()
})

// GET /

// GET /api/file/:id
// POST /api/files

// WS search
// req message consist of input value and file count
// res message consist of files ids
