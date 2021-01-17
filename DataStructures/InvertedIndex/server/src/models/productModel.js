import { v1 as uuidV1 } from 'uuid'

function findAll() {
  return new Promise((resolve, reject) => {
    resolve({
      hello: 'world',
    })
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    resolve({
      hello: `world by ${id}`,
    })
  })
}

function create(title) {
  return new Promise((resolve, reject) => {
    resolve({
      hello: `${title} ${uuidV1()}`,
    })
  })
}

export { findAll, findById, create }
