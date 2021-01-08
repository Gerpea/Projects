;(() => {
  const btn = document.getElementById('add-file')
  const inputFiles = document.getElementById('input-files')

  btn.addEventListener('click', () => {
    const newFile = document.createElement('div')
    newFile.className = 'files-list-el'
    inputFiles.appendChild(newFile)
  })
})()
