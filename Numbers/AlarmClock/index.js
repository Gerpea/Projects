const { setAlarm } = require('./alarm')
const { playSound } = require('./sound')
const { parseDate } = require('./utils')

setAlarm(parseDate(process.argv.slice(2).join(' ')))
  .then(function () {
    playSound()
  })
  .catch(function (e) {
    console.log(e)
  })
