const { setAlarm } = require('./alarm')
const { playSound } = require('./sound')

setAlarm(new Date(Date.now() + 1000 * 1))
  .then(function () {
    console.log('Alarm')
  })
  .catch(function (e) {
    console.log(e)
  })
