import express from 'express'
import cors from 'cors'

class HttpServer {
  constructor() {
    this._httpServer = express()
    this._httpServer.use(cors())
    this._httpServer.use(express.json())
  }

  get(url, listener) {
    this._httpServer.get(url, listener)
  }
  post(url, listener) {
    this._httpServer.post(url, listener)
  }

  listen(listener, port, hostname = '127.0.0.1') {
    this._httpServer.listen(port, hostname, listener)
  }
}

export default HttpServer
