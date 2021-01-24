import WebSocket from 'ws'
import { getWords } from './utils'
import { getFilesIdsByIndexes } from '../index/index.model'

class SocketServer {
  constructor(httpServer, path) {
    this._socketServer = new WebSocket.Server({
      server: httpServer,
      path,
    })
    this._socketServer.on('connection', connectionListener)
    this._socketServer.on('close', () => clearInterval(interval))
    const interval = setInterval(() => this.checkConnection(), 30000)
  }

  checkConnection() {
    this._socketServer.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate()

      ws.isAlive = false
      ws.ping(() => {})
    })
  }
}

function connectionListener(socket) {
  socket.isAlive = true
  socket.on('pong', () => (socket.isAlive = true))

  socket.on('message', async (data) => {
    const words = await getWords(data.toString().trim())
    const files = await getFilesIdsByIndexes(words)
    socket.send(JSON.stringify({ trigger: data.toString(), files }))
  })
}

export default SocketServer
