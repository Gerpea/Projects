const Readable = require('stream').Readable
const bufferAlloc = require('buffer-alloc')
const Speaker = require('speaker')

exports.playSound = function (duration = 2.0) {
  const freq = 440.0 // Concert A, default tone
  generateSine(freq, duration)
}

function generateSine(freq, duration) {
  const sine = new Readable()
  sine.bitDepth = 16
  sine.channels = 2
  sine.sampleRate = 44100
  sine.samplesGenerated = 0
  sine._read = read
  sine.pipe(new Speaker())

  function read(n) {
    const sampleSize = this.bitDepth / 8
    const blockAlign = sampleSize * this.channels
    const numSamples = (n / blockAlign) | 0
    const buf = bufferAlloc(numSamples * blockAlign)
    const amplitude = 32760 // Max amplitude for 16-bit audio

    const t = (Math.PI * 2 * freq) / this.sampleRate

    for (let i = 0; i < numSamples; i++) {
      for (let channel = 0; channel < this.channels; channel++) {
        const s = this.samplesGenerated + i
        const val = Math.round(amplitude * Math.sin(t * s))
        const offset = i * sampleSize * this.channels + channel * sampleSize
        buf[`writeInt${this.bitDepth}LE`](val, offset)
      }
    }

    this.push(buf)

    this.samplesGenerated += numSamples
    if (this.samplesGenerated >= this.sampleRate * duration) {
      this.push(null)
    }
  }
}
