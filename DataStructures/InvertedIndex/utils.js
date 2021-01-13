function filterFiles(files, filter) {
  return (
    files.filter(function (file) {
      return file.file.name === filter
    }) ?? []
  )
}

function showIn(area, files, canBeSelected = true, onClick) {
  const lists = area.getElementsByClassName('list')
  if (!lists) {
    area.classList.add('empty')
    return
  }

  if (files.length > 0) {
    area.classList.remove('empty')
  } else {
    area.classList.add('empty')
  }

  for (let list of lists) {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
    files.forEach(function (file) {
      list.appendChild(createFileNode(file, canBeSelected, onClick))
    })
  }
}

function createFileNode(file, canBeSelected, onClick) {
  const fileNode = document.createElement('div')
  fileNode.className = file.selected && canBeSelected ? 'list__el list__el--selected' : 'list__el'
  fileNode.id = `${file.file.name}`

  if (canBeSelected) {
    fileNode.onclick = () => onClick?.call(this, file)
  }

  fileNode.appendChild(createFileNameNode(file.file.name))
  return fileNode
}

function createFileNameNode(fileName) {
  const fileNameNode = document.createElement('span')
  fileNameNode.className = 'list__el-name'
  fileNameNode.textContent = fileName

  return fileNameNode
}

function checkElement(element, predicate) {
  if (predicate) {
    element.classList.remove('no-display')
  } else {
    element.classList.add('no-display')
  }
}
