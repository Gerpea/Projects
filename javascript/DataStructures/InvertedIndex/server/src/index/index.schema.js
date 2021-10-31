import { Schema, ObjectId } from 'mongoose'

export default new Schema({
  word: String,
  files: [ObjectId],
})
