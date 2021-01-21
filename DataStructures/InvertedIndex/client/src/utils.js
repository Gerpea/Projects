import { v4 as uuidV4 } from 'uuid'
import { fetchFileById } from './api'

function showIn(area, filesId, onClick) {
  const lists = area.getElementsByClassName('list')
  if (!lists) {
    return
  }

  const listNode = new Map()

  for (let list of lists) {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }

    for (let fileId of filesId) {
      const fileNode = createFileNode(onClick)
      list.appendChild(fileNode)
      listNode.set(fileId, fileNode)
    }
  }

  listNode.forEach(async (node, fileId) => {
    await updateFileCard(fileId, node, onClick)
  })
}

function createFileNode() {
  const fileNode = document.createElement('div')
  fileNode.className = 'list__el card'
  fileNode.id = `${uuidV4()}`

  return fileNode
}

async function updateFileCard(fileId, fileNode, onClick) {
  const fileTop = document.createElement('div')
  fileTop.className = 'card__top'
  const fileTitle = document.createElement('div')
  fileTitle.className = 'card__title'
  const fileTime = document.createElement('div')
  fileTime.className = 'card__time'
  const fileContent = document.createElement('div')
  fileContent.className = 'card__content'

  const file = (await fetchFileById(fileId)).data
  fileTitle.innerText = file.name
  fileTime.innerHTML = new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(file.timestamp))
  fileContent.innerText = file.description

  fileTop.appendChild(fileTitle)
  fileTop.appendChild(fileTime)

  fileNode.appendChild(fileTop)
  fileNode.appendChild(fileContent)

  fileNode.onclick = () => onClick?.call(this, file)
}

export { showIn }
