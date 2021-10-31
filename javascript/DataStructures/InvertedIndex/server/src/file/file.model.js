import { model } from 'mongoose'

import fileSchema from './file.schema'
import logger from '../logger'

const FileModel = model('File', fileSchema)

/**
 * @param  {File} file
 * @return {String} id of created file or undefined if not created
 */
async function createFile(file) {
  try {
    const fileId = await (await FileModel.create({ name: file.name, timestamp: new Date() }))._id
    return fileId
  } catch (e) {
    logger.error(`Cannot create file: ${e}`)
  }
}
/**
 * @param  {String} id
 * @return {FileModel} file or null if not found
 */
async function getFileById(id) {
  try {
    return await FileModel.findById(id).exec()
  } catch (e) {
    logger.error(`Cannot get file by id: ${e}`)
  }
}

export { createFile, getFileById }
