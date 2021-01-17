import '../css/main.css'
import { Files } from './files'
import { InvertedIndex } from './invertedIndex'
import { checkElement, filterFiles, showIn } from './utils'
;(() => {
  const invertedIndex = new InvertedIndex()
  const inputFiles = new Files()
  const outputFiles = new Files()

  const outputArea = document.getElementById('output-files')
  const inputArea = document.getElementById('input-files')

  const addBtn = document.getElementById('add-file')
  const removeBtn = document.getElementById('remove-file')

  const fileInput = document.getElementById('file-input')
  const searchInput = document.getElementById('search-input')

  inputArea.onclick = () => {
    if (inputFiles.files.size < 1) {
      fileInput.click()
    }
  }

  inputArea.ondrop = (event) => {
    event.preventDefault()

    if (event.dataTransfer.items) {
      let droppedFiles = []
      for (let item of event.dataTransfer.items) {
        if (item.kind === 'file') {
          droppedFiles.push(item.getAsFile())
        }
      }
      inputFiles.addFiles(droppedFiles)
    } else {
      inputFiles.addFiles(event.dataTransfer.files)
    }
  }

  inputArea.ondragover = (event) => {
    event.preventDefault()
  }

  fileInput.onchange = (event) => {
    inputFiles.addFiles(event.target.files)
  }

  addBtn.onclick = () => {
    fileInput.click()
  }

  removeBtn.onclick = (event) => {
    event.stopPropagation()
    inputFiles.removeSelected()
  }

  searchInput.oninput = (event) => {
    outputFiles.clear()
    outputFiles.addFiles(filterFiles(Array.from(inputFiles.files), event.target.value))
  }

  inputFiles.addFilesChangeListener('add', function (newFiles, addedFile) {
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })

    invertedIndex.addFile(addedFile.file)
    outputFiles.addFiles(filterFiles([addedFile], searchInput.value))
  })
  inputFiles.addFilesChangeListener('remove', function (newFiles, removedFile) {
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })

    const selectedFiles = newFiles.filter(function (file) {
      return file.selected
    })
    checkElement(removeBtn, selectedFiles.length > 0)

    outputFiles.removeFile(removedFile)
  })
  inputFiles.addFilesChangeListener('select', function (newFiles, selectedFile) {
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })

    const selectedFiles = newFiles.filter(function (file) {
      return file.selected
    })
    checkElement(removeBtn, selectedFiles.length > 0)
  })

  outputFiles.addFilesChangeListener('add', function (newFiles, addedFiles) {
    showIn(outputArea, newFiles, false)
  })
  outputFiles.addFilesChangeListener('remove', function (newFiles, removedFiles) {
    showIn(outputArea, newFiles, false)
  })
})()
