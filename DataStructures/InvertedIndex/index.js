;(() => {
  const btn = document.getElementById('add-file')
  const inputFiles = document.getElementById('input-files')
  let files = new Set()

  btn.addEventListener('click', () => {
    const newFile = document.createElement('div')
    files.add(newFile)
    newFile.className = 'files-list__el'
  })
})()
