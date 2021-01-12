class Files {
  constructor() {
    this.files = []
    this._addListeners = []
    this._removeListeners = []
    this._selectListeners = []
  }

  addFiles(files) {
    for (let addedFile of files) {
      addedFile = {
        file: addedFile,
        selected: false,
      }
      if (!this.containFile(addedFile)) {
        this.files.push(addedFile)
        this._notifyListeners('add', addedFile)
      }
    }
  }

  removeFile(file) {
    const delIndex = this.files.findIndex((f) => {
      return this._filesEqual(file, f)
    })

    const deletedFile = this.files[delIndex]
    if (delIndex !== -1) {
      this.files.splice(delIndex, 1)
    }

    this._notifyListeners('remove', deletedFile)
  }

  addFilesChangeListener(type, listener) {
    if (typeof listener === 'function') {
      switch (type) {
        case 'add':
          this._addListeners.push(listener)
          break
        case 'remove':
          this._removeListeners.push(listener)
          break
        case 'select':
          this._selectListeners.push(listener)
          break
        default:
          break
      }
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
      this._notifyListeners('select', file)
    }
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

  _notifyListeners(type, data) {
    let listeners
    switch (type) {
      case 'add':
        listeners = this._addListeners
        break
      case 'remove':
        listeners = this._removeListeners
        break
      case 'select':
        listeners = this._selectListeners
        break
      default:
        return
    }
    listeners.forEach((listener) => {
      listener.apply(this, [this.files, data])
    })
  }
}
