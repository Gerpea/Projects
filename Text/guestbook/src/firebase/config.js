const API_KEY = process.env.VUE_APP_API_KEY
const PROJECT_ID = process.env.VUE_APP_PROJECT_ID
const SENDER_ID = process.env.VUE_APP_SENDER_ID
const APP_ID = process.env.VUE_APP_APP_ID

export default {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
}
