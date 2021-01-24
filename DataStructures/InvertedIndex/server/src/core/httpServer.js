import express from 'express'
import cors from 'cors'

import { filesDir, clientDir } from '../const'
import logger from '../logger'

class HttpServer {
  constructor() {
    this.server = express()
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/files', express.static(filesDir))
    this.server.use('/', express.static(clientDir))
  }

  get(url, listener) {
    try {
      this.server.get(url, listener)
    } catch (e) {
      logger.error(`Uncaught get error: ${e}`)
    }
  }
  post(url, listener) {
    try {
      this.server.post(url, listener)
    } catch (e) {
      logger.error(`Uncaught post error: ${e}`)
    }
  }
}

export default HttpServer
