class TextFile {
  constructor(node, file) {
    this.node = node
    this.file = file
  }
}

class Files {
  constructor() {
    this.files = new Map()
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  notifyListeners() {
    this.listeners.forEach((listener) => {
      listener?.apply(this, [this.files])
    })
  }

  addFile(node, value) {
    this.files.set(value, node)
    this.notifyListeners()
  }

  deleteFile(value) {
    this.files.delete(value)
    this.notifyListeners()
  }

  getFileByValue(value) {
    return this.files.get(value)
  }

  getFileByNode(node) {
    let result = undefined
    this.files.forEach(function (value, n) {
      if (node === value) {
        result = n
        return n
      }
    })
    return result
  }
}

let files = new Files()
let selected = new Files()

;(() => {
  const addBtn = document.getElementById('add-file')
  const removeBtn = document.getElementById('delete-file')
  const inputFiles = document.getElementById('input-files')

  selected.addListener(function (selectedFiles) {
    if (selectedFiles.size > 0) {
      removeBtn.style = 'display: block'
    } else {
      removeBtn.style = 'display: none'
    }
  })

  let i = 0
  addBtn.addEventListener('click', () => {
    const newFile = document.createElement('div')
    inputFiles.appendChild(newFile)

    newFile.addEventListener('click', (event) => {
      event.target.classList.toggle('files-list__el--selected')
      const file = files.getFileByNode(event.target)
      if (file !== undefined) {
        if (selected.getFileByValue(file)) {
          selected.deleteFile(file)
        } else {
          selected.addFile(event.target, file)
        }
      }
    })

    newFile.className = 'files-list__el'

    files.addFile(newFile, i++)
  })

  removeBtn.addEventListener('click', () => {
    selected.files.forEach(function (node, value) {
      files.deleteFile(value)
      inputFiles.removeChild(node)
      selected.deleteFile(value)
    })
  })
})()
