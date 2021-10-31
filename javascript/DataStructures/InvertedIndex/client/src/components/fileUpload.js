import { fromEvent, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

const addBtn = document.getElementById('add-file')
const fileInput = document.getElementById('file-input')
const uploadCounter = document.getElementById('upload-counter')
const uploadProgress = document.getElementById('upload-progress')

const fileValue$ = fromEvent(fileInput, 'change').pipe(map((e) => e.target.files))
const canUpload$ = new BehaviorSubject(true)

fromEvent(addBtn, 'click').subscribe(() => fileInput.click())

canUpload$.subscribe((v) => {
  if (v) {
    addBtn.disabled = false
    uploadCounter.classList.add('no-display')
    uploadProgress.classList.add('no-display')
  } else {
    addBtn.disabled = true
    uploadCounter.classList.remove('no-display')
    uploadProgress.classList.remove('no-display')
  }
})

function setProgress(value) {
  uploadProgress.value = value
}

function setCounter(value) {
  uploadCounter.innerText = value
}

function enableUpload() {
  canUpload$.next(true)
}

function disableUpload() {
  canUpload$.next(false)
}

export { fileValue$, setProgress, setCounter, enableUpload, disableUpload }
