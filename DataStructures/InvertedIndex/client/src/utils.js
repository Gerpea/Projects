import { serverAddress } from './consts'

function getFileUrl(fileId) {
  return `http://${serverAddress}/files/${fileId}`
}

export { getFileUrl }
