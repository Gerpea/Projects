import axios from 'axios'
import { map, retryWhen, delay, tap } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket'

import { serverAddress, apiRoute } from './consts'

const socket$ = webSocket(`ws://${serverAddress}/${apiRoute}/search`)

const fileSearch$ = socket$.pipe(
  retryWhen((e) => e.pipe(delay(1000))),
  map((v) => v.files)
)

async function sendFile(file, progressListener) {
  const formData = new FormData()
  formData.append('file', file)
  return await axios
    .post(`http://${serverAddress}/${apiRoute}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentComleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        progressListener?.call(null, percentComleted)
      },
    })
    .then(() => true)
    .catch(() => false)
}

function searchFile(value) {
  socket$.next(value)
}

async function fetchFileById(id) {
  return (await axios.get(`http://${serverAddress}/${apiRoute}/file/${id}`)).data
}

export { searchFile, fetchFileById, sendFile, fileSearch$ }
