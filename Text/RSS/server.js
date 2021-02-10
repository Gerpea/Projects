const express = require('express')
const corsProxy = require('cors-anywhere')

const APP_PORT = process.env.APP_PORT || 8080
const PROXY_PORT = process.env.PROXY_PORT || 5000

const app = express()

app.use(express.static(__dirname + '/dist'))

corsProxy.createServer().listen(PROXY_PORT, () => {
  console.log('Proxy running')
})

app.listen(APP_PORT, () => {
  console.log('App running')
})
