import mongoose from 'mongoose'

export default async function dbConnect() {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection
    db.on('error', () => reject())
    db.once('open', () => resolve())
    mongoose.connect('mongodb://127.0.0.1/files', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })
}
