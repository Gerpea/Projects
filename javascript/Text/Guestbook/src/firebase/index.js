import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/database'

import config from './config'

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.database()
const functions = firebase.functions()

if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099/')
  db.useEmulator('localhost', 9000)
  functions.useEmulator('localhost', 5001)
}

auth.signInAnonymously()

const messagesCollection = db.ref('messages/')
const commentsCollection = db.ref('comments/')

async function addMessage(content) {
  return functions.httpsCallable('addMessage')({ content })
}

async function addComment(content, messageId) {
  return functions.httpsCallable('addComment')({ content, messageId })
}

function getMessages(addCallback, removeCallback) {
  messagesCollection.orderByChild('timestamp').on('child_added', (data) => {
    const val = data.val()
    addCallback?.call(undefined, {
      id: data.key,
      content: val.content,
      dateTime: new Date(val.timestamp),
    })
  })
  messagesCollection.orderByChild('timestamp').on('child_removed', (data) => {
    const val = data.val()
    removeCallback?.call(undefined, {
      id: data.key,
      content: val.content,
      dateTime: new Date(val.timestamp),
    })
  })
}

function getComments(messageId, addCallback, removeCallback) {
  commentsCollection
    .child(messageId)
    .orderByChild('timestamp')
    .on('child_added', (data) => {
      const val = data.val()
      addCallback?.call(undefined, {
        id: data.key,
        content: val.content,
        dateTime: new Date(val.timestamp),
      })
    })
  commentsCollection
    .child(messageId)
    .orderByChild('timestamp')
    .on('child_removed', (data) => {
      const val = data.val()
      removeCallback?.call(undefined, {
        id: data.key,
        content: val.content,
        dateTime: new Date(val.timestamp),
      })
    })
}

export { getMessages, addMessage, addComment, getComments }
