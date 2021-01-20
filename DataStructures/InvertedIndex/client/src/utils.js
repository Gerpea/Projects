function showIn(area, files, onClick) {
  const lists = area.getElementsByClassName('list')
  if (!lists) {
    return
  }

  for (let list of lists) {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
    files.forEach(function (file) {
      list.appendChild(createFileNode(file, onClick))
    })
  }
}

function createFileNode(file, onClick) {
  const fileNode = document.createElement('div')
  fileNode.className = 'list__el card'
  fileNode.id = `${file.id}`
  const fileTop = document.createElement('div')
  fileTop.className = 'card__top'
  const fileTitle = document.createElement('div')
  fileTitle.className = 'card__title'
  const fileTime = document.createElement('div')
  fileTime.className = 'card__time'
  const fileContent = document.createElement('div')
  fileContent.className = 'card__content'

  fileTop.appendChild(fileTitle)
  fileTop.appendChild(fileTime)

  fileNode.appendChild(fileTop)
  fileNode.appendChild(fileContent)

  fileTitle.innerText = file.name
  fileTime.innerHTML = new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(file.timestamp))
  fileContent.innerText = file.description

  fileNode.onclick = () => onClick?.call(this, file)

  return fileNode
}

export { showIn }
