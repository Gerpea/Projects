const { playSound } = require('./sound')
const { Timer } = require('./timer')

function Alarm() {}
Alarm.prototype.start = function (alarmTime) {
  const currentTime = Date.now()
  if (alarmTime > currentTime) {
    const timer = new Timer(alarmTime)
    timer.start()
    wait(alarmTime - currentTime).then(function () {
      playSound()
    })
  } else {
    throw new RangeError('Alarm time should be greater than current time')
  }
}

async function wait(ms) {
  const intervalDelay = 0x7fffffff
  const intervals = Math.floor(ms / intervalDelay)
  const timerDelay = ms - intervals * intervalDelay
  for (let i = 0; i < intervals; i++) {
    await delay(intervalDelay)
  }
  await delay(timerDelay)
}

function delay(ms) {
  return new Promise(function (resolve, _) {
    setTimeout(function () {
      resolve()
    }, ms)
  })
}

module.exports = { Alarm }
