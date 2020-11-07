exports.parseNumber = function (n) {
  const number = parseInt(n, 10)
  if (!isNaN(number)) {
    return number
  } else {
    console.log('Error: number should be an integer value')
    process.exit(1)
  }
}

exports.generateArray = function (n) {
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(generateInt())
  }

  return result
}

function generateInt() {
  const min = 0
  const max = 100

  return Math.floor(Math.random() * (max - min) + min)
}
