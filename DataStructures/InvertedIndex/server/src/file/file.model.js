import { model } from 'mongoose'
import fileSchema from './file.schema'

const FileModel = model('File', fileSchema)
/**
 * @param  {File} file
 * @return {String} id of created file or undefined if not created
 */
async function createFile(file) {
  return await (await FileModel.create({ name: file.name, path: file.path }))._id
}
/**
 * @param  {String} id
 * @return {FileModel} file or null if not found
 */
async function getFileById(id) {
  return await FileModel.findById(id).exec()
}

export { createFile, getFileById }
