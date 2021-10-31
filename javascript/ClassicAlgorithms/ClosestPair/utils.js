const isValid = require('is-valid-path')
const fs = require('fs')
const { Point } = require('./point')

function parseNumber(n) {
  const number = parseInt(n, 10)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}

function readPoints(path) {
  let points = []
  if (parsePath(path)) {
    points = JSON.parse(fs.readFileSync(path))
  }

  return points
}

function parsePath(o) {
  if (!o) {
    return o
  }

  if (!isValid(o)) {
    console.log('Error: you should specify a correct file path')
    process.exit(1)
  }

  return o
}

function savePointsToFile(path, points) {
  fs.closeSync(fs.openSync(path, 'w'))
  fs.writeFile(path, JSON.stringify(points, null, 2), { flag: 'w' }, function (err) {
    if (err) throw err
  })
}

function generatePoints(count, min, max) {
  let points = []
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * (max - min) + min).toFixed(2)
    const y = (Math.random() * (max - min) + min).toFixed(2)
    points.push(new Point(x, y))
  }

  return points
}

module.exports = { parsePath, generatePoints, savePointsToFile, readPoints, parseNumber }
