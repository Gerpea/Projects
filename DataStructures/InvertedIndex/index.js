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
    if (inputFiles.files.length < 1) {
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
    showIn(outputArea, filterFiles(inputFiles.files, event.target.value), false)
  }

  inputFiles.addFilesChangeListener('add', function (newFiles, addedFile) {
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })
    showIn(outputArea, filterFiles(newFiles, searchInput.value), false)
  })

  inputFiles.addFilesChangeListener('remove', function (newFiles, removedFile) {
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })
    showIn(outputArea, filterFiles(newFiles, searchInput.value), false)
    const selectedFiles = newFiles.filter(function (file) {
      return file.selected
    })
    checkElement(removeBtn, selectedFiles.length > 0)
  })

  inputFiles.addFilesChangeListener('select', function (newFiles, selectedFile) {
    const selectedFiles = newFiles.filter(function (file) {
      return file.selected
    })
    showIn(inputArea, newFiles, true, (file) => {
      inputFiles.toggleSelect(file)
    })
    checkElement(removeBtn, selectedFiles.length > 0)
  })
})()
