import axios from 'axios';

const serverAddress = process.env.SERVER_ADDRESS || '127.0.0.1:3000';
const apiRoute = process.env.API_ROUTE || 'api';

async function fetchFileById(id) {
  return axios.get(`http://${serverAddress}/${apiRoute}/file/${id}`);
}

async function sendFile(file, progressListener) {
  const formData = new FormData();
  formData.append('file', file);
  return axios
    .post(`http://${serverAddress}/${apiRoute}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      onUploadProgress: (progressEvent) => {
        const percentComleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        progressListener?.call(null, percentComleted);
      },
    })
    .then(() => true)
    .catch(() => false);
}

function getFileUrl(file) {
  return `http://${serverAddress}/files/${file.id}`;
}

class SearchApi {
  constructor() {
    this.connect();
    this.listeners = [];
    this.lastRequestTrigger = undefined;
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  searchFiles(value) {
    this.lastRequestTrigger = value;
    this.socket.send(value);
  }

  connect() {
    this.socket = new WebSocket(`ws://${serverAddress}/${apiRoute}/search`);
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.trigger === this.lastRequestTrigger) {
        this.listeners.forEach((listener) => {
          listener(data.files);
        });
      }
    });
    this.socket.addEventListener('close', () => {
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
  }
}

export { fetchFileById, sendFile, SearchApi, getFileUrl };
