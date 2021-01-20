import express from 'express'
import cors from 'cors'

class HttpServer {
  constructor() {
    this.server = express()
    this.server.use(cors())
    this.server.use(express.json())
  }

  get(url, listener) {
    this.server.get(url, listener)
  }
  post(url, listener) {
    this.server.post(url, listener)
  }
}

export default HttpServer
