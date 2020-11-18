exports.parseDate = function (input) {
  let date
  const { minutes, seconds } = getMinutesAndSeconds(input)
  if (minutes || seconds) {
    date = new Date(Date.now() + 1000 * (seconds || 0) + 60 * 1000 * (minutes || 0))
  } else {
    date = new Date(Date.parse(input))
  }

  if (!isNaN(date)) {
    return date
  } else {
    showHelp()
    process.exit(0)
  }
}

function getMinutesAndSeconds(input) {
  let minutes
  let seconds

  const matches = input.matchAll(/((\d+)[mM])*\s*((\d+)[sS])*/g)
  for (match of matches) {
    if (match[2]) {
      minutes = parseInt(match[2])
    }
    if (match[4]) {
      seconds = parseInt(match[4])
    }
  }

  return { minutes, seconds }
}

function showHelp() {
  console.log('Usage:')
  console.log('\tInput minutes and seconds in format: [xm][ys]')
  console.log('\tor')
  console.log('\tInput date in format: mm/dd/yyyy hh:mm[:ss]')
}
