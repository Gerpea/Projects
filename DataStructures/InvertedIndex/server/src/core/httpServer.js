import express from 'express'
import cors from 'cors'
import { filesDir } from '../const'

class HttpServer {
  constructor() {
    this.server = express()
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/files', express.static(filesDir))
  }

  get(url, listener) {
    this.server.get(url, listener)
  }
  post(url, listener) {
    this.server.post(url, listener)
  }
}

export default HttpServer
