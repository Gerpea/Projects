exports.setAlarm = function (alarmTime) {
  return new Promise(async function (resolve, reject) {
    const currentTime = Date.now()
    if (alarmTime > currentTime) {
      const delay = alarmTime - currentTime

      const intervalDelay = 0x7fffffff
      const intervals = Math.floor(delay / intervalDelay)
      const timerDelay = delay - intervals * intervalDelay

      await new Promise(function (intervaResolve, _) {
        let i = 0
        const interval = setInterval(function () {
          if (i >= intervals) {
            intervaResolve()
            clearInterval(interval)
          }

          i++
        }, intervals * intervalDelay)
      })

      setTimeout(function () {
        resolve()
      }, timerDelay)
    } else {
      reject(new Error('Alarm time should be in the future'))
    }
  })
}
