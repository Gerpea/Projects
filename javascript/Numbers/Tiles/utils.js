function parseNumber(n) {
  const number = parseFloat(n, 10)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: digits should be an integer value')
    process.exit(1)
  }
}

exports.parseOpts = function (opts) {
  let width = undefined
  let height = undefined
  let tileWidth = undefined
  let tileHeight = undefined
  let cost = parseNumber(opts.cost)
  let useCut = opts.useCut ? true : false

  if (opts.width) {
    width = parseNumber(opts.width)
    if (opts.height) {
      height = parseNumber(opts.height)
    } else {
      height = width
    }
  }

  if (opts.height) {
    height = parseNumber(opts.height)
    if (opts.width) {
      width = parseNumber(opts.width)
    } else {
      width = height
    }
  }

  if (opts.tileWidth) {
    tileWidth = parseNumber(opts.tileWidth)
    if (opts.tileHeight) {
      tileHeight = parseNumber(opts.tileHeight)
    } else {
      tileHeight = tileWidth
    }
  }

  if (opts.tileHeight) {
    tileHeight = parseNumber(opts.tileHeight)
    if (opts.tileWidth) {
      tileWidth = parseNumber(opts.tileWidth)
    } else {
      tileWidth = tileHeight
    }
  }

  return {
    width,
    height,
    tileWidth,
    tileHeight,
    cost,
    useCut,
  }
}
