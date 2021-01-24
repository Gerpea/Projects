const outputArea = document.getElementById('output-files')
const list = outputArea.getElementsByClassName('list')[0]

function addFile(fileId, onClick) {
  list.appendChild(createFileNode(fileId, onClick))
}

function removeFile(fileId) {
  const fileNode = document.getElementById(fileId)
  if (fileNode) {
    list.removeChild(fileNode)
  }
}

function createFileNode(file, onClick) {
  const fileNode = document.createElement('div')
  fileNode.className = 'list__el card'
  fileNode.id = file.id

  fileNode.appendChild(createFileTop(file))
  fileNode.appendChild(createFileContent(file))

  fileNode.onclick = () => onClick?.call(this, file)

  return fileNode
}

function createFileTop(file) {
  const fileTop = document.createElement('div')
  fileTop.className = 'card__top'

  fileTop.appendChild(createFileTitle(file))
  fileTop.appendChild(createFileTime(file))

  return fileTop
}

function createFileContent(file) {
  const fileContent = document.createElement('div')
  fileContent.className = 'card__content'
  fileContent.innerText = file.description

  return fileContent
}

function createFileTitle(file) {
  const fileTitle = document.createElement('div')
  fileTitle.className = 'card__title'
  fileTitle.innerText = file.name

  return fileTitle
}

function createFileTime(file) {
  const fileTime = document.createElement('div')
  fileTime.className = 'card__time'
  fileTime.innerHTML = new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(file.timestamp))

  return fileTime
}

export { addFile, removeFile }
