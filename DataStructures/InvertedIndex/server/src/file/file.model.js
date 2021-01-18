import { model } from 'mongoose'
import fileSchema from './file.schema'

const FileModel = model('File', fileSchema)
/**
 * @param  {File} file
 * @return {String} id of created file or undefined if not created
 */
async function createFile(file) {
  const fileId = await (await FileModel.create({ name: file.name, timestamp: new Date() }))._id
  return fileId
}
/**
 * @param  {String} id
 * @return {FileModel} file or null if not found
 */
async function getFileById(id) {
  return await FileModel.findById(id).exec()
}

export { createFile, getFileById }
