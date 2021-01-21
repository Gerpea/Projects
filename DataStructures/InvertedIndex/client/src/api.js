import axios from 'axios'

const serverAddress = process.env.SERVER_ADDRESS || '127.0.0.1:3000'
const apiRoute = process.env.API_ROUTE || 'api'

async function fetchFileById(id) {
  return await axios.get(`http://${serverAddress}/${apiRoute}/file/${id}`)
}

async function sendFile(file, progressListener) {
  const formData = new FormData()
  formData.append('file', file)
  return await axios
    .post(`http://${serverAddress}/${apiRoute}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      onUploadProgress: (progressEvent) => {
        const percentComleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        progressListener?.call(null, percentComleted)
      },
    })
    .then(() => true)
    .catch(() => false)
}

function getFileUrl(file) {
  return `http://${serverAddress}/files/${file.id}`
}

class SearchApi {
  constructor() {
    this._connect()
    this._listeners = []
    this._lastRequestTrigger = undefined
  }

  addListener(listener) {
    this._listeners.push(listener)
  }

  searchFiles(value) {
    this._lastRequestTrigger = value
    this._socket.send(value)
  }

  _connect() {
    this._socket = new WebSocket(`ws://${serverAddress}/${apiRoute}/search`)
    this._socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      if (data.trigger === this._lastRequestTrigger) {
        for (let listener of this._listeners) {
          listener(data.files)
        }
      }
    })
    this._socket.addEventListener('close', () => {
      setTimeout(() => {
        this._connect()
      }, 1000)
    })
  }
}

export { fetchFileById, sendFile, SearchApi, getFileUrl }
