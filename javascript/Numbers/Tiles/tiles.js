exports.getTilesCount = function (width, height, tileWidth, tileHeight) {
  const tilesInWidth = width / tileWidth
  const tilesInHeight = height / tileHeight

  return { tilesInWidth, tilesInHeight }
}

exports.calculateCost = function ({ tilesInWidth, tilesInHeight }, cost, useCut = false) {
  if (!useCut) {
    return Math.ceil(tilesInWidth) * Math.ceil(tilesInHeight) * cost
  } else {
    return Math.ceil(tilesInWidth * tilesInHeight) * cost
  }
}
