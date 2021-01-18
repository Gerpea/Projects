import net from 'net'

class SocketServer {
  constructor() {
    this._socketServer = net.createServer(this._connectionListener)
  }

  _connectionListener(socket) {}

  listen(listener, port, hostname = '127.0.0.1') {
    this._socketServer.listen(port, hostname, listener)
  }

  close() {
    this._socketServer.close()
  }
}

export default SocketServer
