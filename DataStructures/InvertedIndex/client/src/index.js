import '../css/main.css'
import { Files } from './files'
import { checkElement, filterFiles, showIn } from './utils'
;(() => {
  const outputFiles = new Files()

  const outputArea = document.getElementById('output-files')
  const addBtn = document.getElementById('add-file')
  const fileInput = document.getElementById('file-input')
  const searchInput = document.getElementById('search-input')

  addBtn.onclick = () => {
    fileInput.click()
  }

  searchInput.oninput = (event) => {
    outputFiles.clear()
    outputFiles.addFiles(filterFiles(Array.from(inputFiles.files), event.target.value))
  }

  outputFiles.addFilesChangeListener('add', function (newFiles, addedFiles) {
    showIn(outputArea, newFiles, false)
  })
  outputFiles.addFilesChangeListener('remove', function (newFiles, removedFiles) {
    showIn(outputArea, newFiles, false)
  })
})()
