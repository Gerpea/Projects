import { Server } from './core'

const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

const server = new Server()

server.get('/api/file/:id', (req, res) => {
  console.log(req.url.params)
  res.end('end')
})

server.listen(
  () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  },
  port,
  hostname
)

// GET /

// GET /api/file/:id
// POST /api/files
// DELETE /api/file/:id

// WS search
// req message consist of input value and file count
// res message consist of files ids
