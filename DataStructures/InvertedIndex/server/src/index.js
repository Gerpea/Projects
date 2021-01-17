import { Server } from './core'
import dbConnect from './db'

const pid = process.pid
const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

const server = new Server()

server.get('/api/file/:id', (req, res) => {
  console.log(req.url.params)
  res.end(JSON.stringify(req.url))
})

server.post('/api/files', (req, res) => {
  console.log(req.url.params)
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
