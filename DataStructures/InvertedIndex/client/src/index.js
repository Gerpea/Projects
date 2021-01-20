import '../css/main.css'
import { Files } from './files'
import { showIn } from './utils'
import { fetchFileById, SearchApi, sendFile } from './api'
;(() => {
  const searchApi = new SearchApi()
  const outputFiles = new Files()

  const menuBox = document.getElementById('menu')
  const outputArea = document.getElementById('output-files')
  const addBtn = document.getElementById('add-file')
  const fileInput = document.getElementById('file-input')
  const searchInput = document.getElementById('search-input')

  searchApi.addListener(async (data) => {
    outputFiles.clear()
    if (data.length === 0) {
      menuBox.classList.add('center')
    } else {
      menuBox.classList.remove('center')
      for (let fileId of data) {
        outputFiles.addFiles([(await fetchFileById(fileId)).data])
      }
    }
  })

  addBtn.onclick = () => {
    fileInput.click()
  }

  fileInput.onchange = (event) => {
    for (let file of event.target.files) {
      sendFile(file)
    }
  }

  searchInput.oninput = (event) => {
    searchApi.searchFiles(event.target.value)
  }

  outputFiles.addFilesChangeListener('add', function (newFiles) {
    showIn(outputArea, newFiles)
  })
  outputFiles.addFilesChangeListener('remove', function (newFiles) {
    showIn(outputArea, newFiles)
  })
})()
