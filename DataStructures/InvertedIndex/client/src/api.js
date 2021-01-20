import axios from 'axios'

async function fetchFileById(id) {
  return await axios.get(`http://127.0.0.1:3000/api/file/${id}`)
}

async function sendFile(file) {
  const formData = new FormData()
  formData.append('file', file)
  await axios
    .post('http://127.0.0.1:3000/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .catch((err) => console.log(err))
}

class SearchApi {
  constructor() {
    this._socket = new WebSocket('ws://127.0.0.1:5031/api/search')
    this._socket.addEventListener('message', (event) => {
      this._listeners.forEach((listener) => {
        listener?.call(this, JSON.parse(event.data))
      })
    })
    this._listeners = []
  }

  addListener(listener) {
    this._listeners.push(listener)
  }

  searchFiles(value) {
    this._socket.send(value)
  }
}

export { fetchFileById, sendFile, SearchApi }
