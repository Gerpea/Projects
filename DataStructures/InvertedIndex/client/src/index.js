import '../css/main.css'
import { Files } from './files'
import { showIn } from './utils'
import { SearchApi, sendFile, getFileUrl } from './api'
import _ from 'lodash'
;(() => {
  const searchApi = new SearchApi()
  const outputFiles = new Files()

  const menuBox = document.getElementById('menu')
  const outputArea = document.getElementById('output-files')
  const addBtn = document.getElementById('add-file')
  const fileInput = document.getElementById('file-input')
  const searchInput = document.getElementById('search-input')
  const uploadCounter = document.getElementById('upload-counter')
  const uploadProgress = document.getElementById('upload-progress')

  searchApi.addListener((data) => {
    if (data.length === 0) {
      outputFiles.clear()
      menuBox.classList.add('menu--center')
    } else {
      menuBox.classList.remove('menu--center')
      const newFiles = new Set()

      for (let fileId of data) {
        newFiles.add(fileId)
      }
      if (
        newFiles.size !== outputFiles.files.size ||
        _.difference(newFiles, outputFiles.files).length !== 0
      ) {
        outputFiles.clear()
        outputFiles.addFiles(newFiles)
      }
    }
  })

  addBtn.onclick = () => {
    fileInput.click()
  }

  fileInput.onchange = async (event) => {
    const totalFile = event.target.files.length
    let sended = 0
    uploadCounter.innerText = `${sended}/${totalFile}`
    uploadProgress.value = 0
    uploadCounter.classList.remove('no-display')
    uploadProgress.classList.remove('no-display')
    for (let file of event.target.files) {
      await sendFile(file, (progress) => {
        uploadProgress.value = progress
      })
      sended++
      uploadCounter.innerText = `${sended}/${totalFile}`
    }
    setTimeout(() => {
      uploadCounter.classList.add('no-display')
      uploadProgress.classList.add('no-display')
    }, 500)
  }

  let timer
  searchInput.oninput = (event) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      searchApi.searchFiles(event.target.value)
    }, 300)
  }

  outputFiles.addFilesChangeListener('add', function (newFiles) {
    showIn(outputArea, newFiles, (file) => {
      window.location = getFileUrl(file)
    })
  })

  outputFiles.addFilesChangeListener('remove', function (newFiles) {
    showIn(outputArea, newFiles)
  })
})()
