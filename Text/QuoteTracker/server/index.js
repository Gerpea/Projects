import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

import Redis from 'ioredis'

dotenv.config()

const app = express()
app.use(cors())

const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
})

app.get('/api/:endpoint', async (req, res) => {
  try {
    const key = buildKey(req)
    let cacheEntry = await redis.get(key)
    if (cacheEntry) {
      cacheEntry = JSON.parse(cacheEntry)

      return res.json(cacheEntry)
    } else {
      const response = await axios.get(buildApiEndpoint(req))
      redis.set(key, JSON.stringify(response.data), 'EX', getTime(req.query.function))

      return res.json(response.data)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
})

const buildKey = (req) => {
  return req.originalUrl
}

const getTime = (f) => {
  switch (f) {
    case 'SYMBOL_SEARCH':
      return 3600 * 24 // 24 hours
    default:
      return 3600 // one hour
  }
}

const baseApiUrl = 'https://www.alphavantage.co/'
const API_KEY = process.env.API_KEY || ''
const buildApiEndpoint = (req) => {
  return (
    baseApiUrl +
    req.params.endpoint +
    '?' +
    Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}&`)
      .join('') +
    `apikey=${API_KEY}`
  )
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`AlphaVantage API proxy server started at ${PORT}`)
})
