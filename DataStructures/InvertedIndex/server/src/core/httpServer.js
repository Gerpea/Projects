import express from 'express'
import cors from 'cors'
import { filesDir, clientDir } from '../const'

class HttpServer {
  constructor() {
    this.server = express()
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/files', express.static(filesDir))
    this.server.use('/', express.static(clientDir))
  }

  get(url, listener) {
    this.server.get(url, listener)
  }
  post(url, listener) {
    this.server.post(url, listener)
  }
}

export default HttpServer
