const { Alarm } = require('./Alarm')
const { parseDate } = require('./utils')

const alarmTime = parseDate(process.argv.slice(2).join(' '))
const alarm = new Alarm()
try {
  alarm.start(alarmTime)
} catch (e) {
  console.log(`Error: ${e.message}`)
}
