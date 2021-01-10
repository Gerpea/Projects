class Files {
  constructor() {
    this.files = []
    this._listeners = []
  }

  addFiles(files) {
    for (let addedFile of files) {
      addedFile = {
        file: addedFile,
        selected: false,
      }
      if (!this.containFile(addedFile)) {
        this.files.push(addedFile)
      }
    }

    this._notifyListeners()
  }

  removeFile(deletedFile) {
    const delIndex = this.files.findIndex((file) => {
      return this._filesEqual(deletedFile, file)
    })

    if (delIndex !== -1) {
      this.files.splice(delIndex, 1)
    }

    this._notifyListeners()
  }

  addFilesChangeListener(listener) {
    if (typeof listener === 'function') {
      this._listeners.push(listener)
    }
  }

  containFile(checkedFile) {
    return (
      this.files.findIndex((file) => {
        return this._filesEqual(file, checkedFile)
      }) !== -1
    )
  }

  toggleSelect(toggledFile) {
    const file = this.files.find((file) => this._filesEqual(file, toggledFile))
    if (file) {
      file.selected = !file.selected
    }

    this._notifyListeners()
  }

  removeSelected() {
    let removedFile = []

    this.files.forEach(function (file) {
      if (file.selected) {
        removedFile.push(file)
      }
    })

    removedFile.forEach((file) => {
      this.removeFile(file)
    })
  }

  _filesEqual(file1, file2) {
    return file1.file.name === file2.file.name
  }

  _notifyListeners() {
    this._listeners.forEach((listener) => {
      listener.call(this, this.files)
    })
  }
}

;(() => {
  const inputFiles = new Files()

  const outputArea = document.getElementById('output-files')
  const inputArea = document.getElementById('input-files')
  const addBtn = document.getElementById('add-file')
  const fileInput = document.getElementById('file-input')
  const removeBtn = document.getElementById('remove-file')
  const searchInput = document.getElementById('search')

  addBtn.onclick = () => {
    fileInput.click()
  }

  fileInput.onchange = (event) => {
    inputFiles.addFiles(event.target.files)
  }

  removeBtn.onclick = () => {
    inputFiles.removeSelected()
  }

  searchInput.oninput = (event) => {
    showIn(outputArea, filterFiles(inputFiles.files, searchInput.value), true)
  }

  inputFiles.addFilesChangeListener(function (newFiles) {
    showIn(inputArea, newFiles)
    showIn(outputArea, filterFiles(newFiles, searchInput.value), true)
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
