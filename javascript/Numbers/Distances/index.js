const { getPoint, getUnit } = require('./prompt')
const { distance } = require('./distance')
const { convertMeters } = require('./convert')

;(async () => {
  const fP = await getPoint()
  const sP = await getPoint()
  const unit = await getUnit()

  console.log(`${convertMeters(distance(fP, sP), unit)} ${unit}`)
})()
