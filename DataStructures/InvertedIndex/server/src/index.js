import { HttpServer, SocketServer } from './core'
import dbConnect from './db'
import routes from './routes'
import http from 'http'

const pid = process.pid

const hostname = process.env.HOSTNAME || '127.0.0.1'
const httpPort = process.env.HTTP_PORT || 3000
const socketPath = process.env.SOCKET_PATH || '/api/search'

const httpServer = new HttpServer()

httpServer.get(routes.getFileById.path, routes.getFileById.listener)
httpServer.post(routes.createFile.path, routes.createFile.listener)

dbConnect()
  .then(() => {
    startServers()
  })
  .catch((e) => {
    console.log(e)
    console.log('[Error]: Cannot connect to db')
  })

function startServers() {
  const server = http.createServer(httpServer.server)
  new SocketServer(server, socketPath)
  server.listen(httpPort, hostname, () => {
    console.log(`[Info]: Server running at ${hostname}:${httpPort}/ with pid: ${pid}`)
  })
}
