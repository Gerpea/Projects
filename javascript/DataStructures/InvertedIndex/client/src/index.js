import '../css/main.css'
import _ from 'lodash'
import { pairwise, startWith } from 'rxjs/operators'

import { searchFile, fetchFileById, sendFile, fileSearch$ } from './api'
import { addFile, removeFile } from './components/fileList'
import { searchValue$ } from './components/searchInput'
import {
  fileValue$,
  setCounter,
  setProgress,
  disableUpload,
  enableUpload,
} from './components/fileUpload'
import { getFileUrl } from './utils'

searchValue$.subscribe((v) => {
  searchFile(v)
})

fileSearch$.pipe(startWith([]), pairwise()).subscribe(([prevIds, currentIds]) => {
  const exists = _.intersection(prevIds, currentIds)

  _.difference(prevIds, exists).forEach((fileId) => {
    removeFile(fileId)
  })

  currentIds.forEach(async (fileId) => {
    if (!_.includes(exists, fileId)) {
      const file = await fetchFileById(fileId)
      if (file) {
        addFile({ ...file, id: fileId, description: file.description.trim() }, (file) => {
          window.location = getFileUrl(file.id)
        })
      }
    }
  })
})

fileValue$.subscribe(async (files) => {
  disableUpload()
  let sended = 0
  for (let file of files) {
    setCounter(`${sended++}/${files.length}`)
    await sendFile(file, (progress) => {
      setProgress(progress)
    })
  }
  enableUpload()
})
