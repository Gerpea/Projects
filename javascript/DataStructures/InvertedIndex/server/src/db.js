import mongoose from 'mongoose'
import logger from './logger'

const connectionString = process.env.MONGO_DB_CONN_STR || 'mongodb://127.0.0.1/files'

export default async function dbConnect() {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection
    db.on('error', (e) => reject(e))
    db.once('open', () => resolve(db))

    try {
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    } catch (e) {
      reject(e)
    }
  })
}
