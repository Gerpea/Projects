import axios from 'axios'

const apiAddress = process.env.API_ADDRESS || '127.0.0.1/api'

async function fetchFileById(id) {
  return await axios.get(`http://${apiAddress}/file/${id}`)
}

async function sendFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  await axios
    .post(`http://${apiAddress}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .catch((err) => console.log(err))
}

class SearchApi {
  constructor() {
    this._connect()
    this._listeners = []
  }

  addListener(listener) {
    this._listeners.push(listener)
  }

  searchFiles(value) {
    this._socket.send(value)
  }

  _connect() {
    this._socket = new WebSocket(`ws://${apiAddress}/search`)
    this._socket.addEventListener('message', (event) => {
      this._listeners.forEach((listener) => {
        listener?.call(this, JSON.parse(event.data))
      })
    })
    this._socket.addEventListener('close', () => {
      setTimeout(() => {
        this._connect()
      }, 1000)
    })
  }
}

export { fetchFileById, sendFile, SearchApi }
