function Timer(dateTime) {
  this.dateTime = dateTime
  this.interval
}

Timer.prototype.start = function () {
  this.interval = setInterval(() => {
    if (this.dateTime - Date.now() > 0) {
      printTime(this.dateTime - Date.now())
    } else {
      this.stop()
    }
  }, 1000)
}

Timer.prototype.stop = function () {
  clearInterval(this.interval)
  printTime(0)
  printNewLine()
}

function printTime(remainingTime) {
  const { h, m, s } = getHMS(remainingTime)
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`Time remaining: ${h}:${m}:${s}`)
}

function printNewLine() {
  process.stdout.write('\n')
}

function getHMS(ms) {
  const s = Math.floor((ms / 1000) % 60)
  const m = Math.floor((ms / 1000 / 60) % 60)
  const h = Math.floor((ms / 1000 / 60 / 60) % 24)

  return {
    h,
    m,
    s,
  }
}

module.exports = { Timer }
