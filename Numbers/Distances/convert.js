const units = Object.freeze({
  milimeter: 1000,
  centimeter: 100,
  meter: 1,
  kilometer: 1 / 1000,
})

function convertMeters(meters, unit) {
  let result = meters
  if (units.hasOwnProperty(unit)) {
    result *= units[unit]
  }

  return result.toFixed(2)
}

module.exports = { convertMeters, units }
