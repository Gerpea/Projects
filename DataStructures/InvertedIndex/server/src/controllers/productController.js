import { findAll, findById, create } from '../models/productModel'

async function getProducts(req, res) {
  try {
    const products = await findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (e) {
    console.log(e)
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await findById(id)
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (e) {
    console.log(e)
  }
}

async function createProduct(req, res) {
  try {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      const { title } = JSON.parse(body)
      const product = await create(title)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    })
  } catch (e) {
    console.log(e)
  }
}

export { getProducts, getProduct, createProduct }
