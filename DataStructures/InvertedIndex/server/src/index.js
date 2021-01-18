import { HttpServer, SocketServer } from './core'
import dbConnect from './db'
import routes from './routes'

const pid = process.pid

const hostname = process.env.HOSTNAME || '127.0.0.1'
const httpPort = process.env.HTTP_PORT || 3000
const socketPort = process.env.SOCKET_PORT || 3056

const httpServer = new HttpServer()
const socketServer = new SocketServer()

httpServer.get(routes.getFileById.path, routes.getFileById.listener)
httpServer.post(routes.createFile.path, routes.createFile.listener)

dbConnect()
  .then(() => {
    startServers()
  })
  .catch(() => {
    console.log('[Error]: Cannot connect to db')
    process.exit(0)
  })

process.on('beforeExit', () => {
  httpServer.close()
})

function startServers() {
  httpServer.listen(
    () => {
      console.log(`[Info]: HTTP Server running at http://${hostname}:${httpPort}/ with pid: ${pid}`)
    },
    httpPort,
    hostname
  )
  socketServer.listen(
    () => {
      console.log(
        `[Info]: Socket Server running at ws://${hostname}:${socketPort}/ with pid: ${pid}`
      )
    },
    socketPort,
    hostname
  )
}
