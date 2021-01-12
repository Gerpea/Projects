;(() => {
  const invertedIndex = new InvertedIndex()
  const inputFiles = new Files()

  const outputFilesArea = document.getElementById('output-files')
  const inputFilesArea = document.getElementById('input-files')
  const addBtn = document.getElementById('add-file')
  const fileInput = document.getElementById('file-input')
  const removeBtn = document.getElementById('remove-file')
  const searchInput = document.getElementById('search')
  const dragArea = document.getElementById('drag-area')
  const outputArea = document.getElementById('output-area')

  addBtn.onclick = () => {
    fileInput.click()
  }

  fileInput.onchange = (event) => {
    inputFiles.addFiles(event.target.files)
  }

  dragArea.onclick = () => {
    if (inputFiles.files.length < 1) {
      fileInput.click()
    }
  }

  dragArea.ondrop = (event) => {
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

  dragArea.ondragover = (event) => {
    event.preventDefault()
  }

  removeBtn.onclick = (event) => {
    event.stopPropagation()
    inputFiles.removeSelected()
  }

  searchInput.oninput = (event) => {
    showIn(outputFilesArea, filterFiles(inputFiles.files, event.target.value), false)
    if (filterFiles(inputFiles.files, event.target.value).length > 0) {
      outputArea.classList.remove('result__empty')
    } else {
      outputArea.classList.add('result__empty')
    }
  }

  inputFiles.addFilesChangeListener(function (newFiles) {
    showIn(inputFilesArea, newFiles)
    showIn(outputFilesArea, filterFiles(newFiles, searchInput.value), false)
  })

  inputFiles.addFilesChangeListener(function (newFiles) {
    const selectedFiles = newFiles.filter(function (file) {
      return file.selected
    })
    if (selectedFiles.length > 0) {
      removeBtn.style = 'display: block'
    } else {
      removeBtn.style = 'display: none'
    }
  })

  inputFiles.addFilesChangeListener(function (newFiles) {
    if (newFiles.length > 0) {
      dragArea.classList.remove('empty')
    } else {
      dragArea.classList.add('empty')
    }
  })

  inputFiles.addFilesChangeListener(function (newFiles) {
    if (filterFiles(newFiles, searchInput.value).length > 0) {
      outputArea.classList.remove('result__empty')
    } else {
      outputArea.classList.add('result__empty')
    }
  })

  function filterFiles(files, filter) {
    return (
      files.filter(function (file) {
        return file.file.name === filter
      }) ?? []
    )
  }

  function showIn(area, files, canBeSelected = true) {
    while (area.firstChild) {
      area.removeChild(area.firstChild)
    }

    files.forEach(function (file) {
      area.appendChild(createFileNode(file, canBeSelected))
    })
  }

  function createFileNode(file, canBeSelected) {
    const fileNode = document.createElement('div')
    fileNode.className =
      file.selected && canBeSelected ? 'files-list__el files-list__el--selected' : 'files-list__el'
    fileNode.id = `${file.file.name}`

    if (canBeSelected) {
      fileNode.onclick = (event) => {
        inputFiles.toggleSelect(file)
      }
    }

    fileNode.appendChild(createFileNameNode(file.file.name))
    return fileNode
  }

  function createFileNameNode(fileName) {
    const fileNameNode = document.createElement('span')
    fileNameNode.className = 'files_list__el-name'
    fileNameNode.textContent = fileName

    return fileNameNode
  }
})()
