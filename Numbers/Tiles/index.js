const program = require('commander')

const { getTilesCount, calculateCost } = require('./tiles')
const { parseOpts } = require('./utils')

program
  .option('-w, --width <number>', 'Floor width')
  .option('-h, --height <number>', 'Floor height')
  .option('-tw, --tile-width <number>', 'Tile width')
  .option('-th, --tile-height <number>', 'Tile height')

  .requiredOption('-c, --cost <number>', 'Single tile cost')

  .option('-uc, --use-cut', 'Use the cut tiles?')

program.parse(process.argv)
;(() => {
  const { width, height, tileHeight, tileWidth, cost, useCut } = parseOpts(program)

  if (
    width === undefined ||
    height === undefined ||
    tileHeight === undefined ||
    tileWidth === undefined
  ) {
    console.log('Please use --help')
    process.exit(0)
  }

  console.log(
    `Calculated cost is: ${calculateCost(
      getTilesCount(width, height, tileWidth, tileHeight),
      cost,
      useCut
    )}`
  )
})()
