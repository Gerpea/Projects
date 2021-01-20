import WebSocket from 'ws'
import { getWords } from './utils'
import { getFilesIdsByIndexes } from '../index/index.model'
class SocketServer {
  constructor(httpServer, path) {
    this._socketServer = new WebSocket.Server({
      server: httpServer,
      path,
    })
    const interval = setInterval(() => {
      this._socketServer.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate()

        ws.isAlive = false
        ws.ping(() => {})
      })
    }, 30000)
    this._socketServer.on('connection', this._connectionListener)
    this._socketServer.on('close', () => clearInterval(interval))
  }

  _connectionListener(socket) {
    socket.isAlive = true
    socket.on('pong', () => (socket.isAlive = true))

    socket.on('message', async (data) => {
      const words = await getWords(data.toString())
      const files = await getFilesIdsByIndexes(words)
      socket.send(JSON.stringify(files))
    })
  }
}

export default SocketServer
