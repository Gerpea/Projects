import { Schema, model } from 'mongoose'

const fileSchema = new Schema({
  path: String,
})

export default model('File', fileSchema)
