import mongoose from 'mongoose'
const connectionString = process.env.MONGO_DB_CONN_STR || 'mongodb://127.0.0.1/files'
export default async function dbConnect() {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection
    db.on('error', () => reject())
    db.once('open', () => resolve())

    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })
}
