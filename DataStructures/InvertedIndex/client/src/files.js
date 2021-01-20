class Files {
  constructor() {
    this.files = new Set()
    this._addListeners = []
    this._removeListeners = []
  }

  addFiles(files) {
    for (let addedFile of files) {
      if (!this.findFile((file) => this._filesEqual(file, addedFile))) {
        this.files.add(addedFile)
        this._notifyListeners('add', addedFile)
      }
    }
  }

  removeFile(removedFile) {
    const file = this.findFile((file) => this._filesEqual(file, removedFile))
    this.files.delete(file)
    this._notifyListeners('remove', file)
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
        default:
          break
      }
    }
  }

  findFile(predicate) {
    for (let file of this.files) {
      if (predicate(file)) {
        return file
      }
    }
  }

  clear() {
    const data = Array.from(this.files)
    this.files.clear()
    this._notifyListeners('remove', data)
  }

  _filesEqual(file1, file2) {
    return file1.id === file2.id
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
      default:
        return
    }
    listeners.forEach((listener) => {
      listener.apply(this, [Array.from(this.files.values()), data])
    })
  }
}

export { Files }
