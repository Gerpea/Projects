import { find } from './charTables'

const Ciphers = Object.freeze({
  Ceasar: 0,
  Vigenere: 1,
  Vernam: 2,
})

function encrypt(value, chiper, params) {
  switch (chiper) {
    case Ciphers.Ceasar:
      return encryptCeasar(value, params)
    case Ciphers.Vigenere:
      return encryptVigenere(value, params)
    case Ciphers.Vernam:
      return encryptVernam(value, params)
  }
}

function encryptCeasar(value, params) {
  const shift = parseInt(params?.key ?? 0)
  return value
    .split('')
    .map((char) => {
      const charCode = char.charCodeAt(0)
      const block = find(charCode)
      if (!block) {
        return char
      }
      const charIndex = block.indexOf(charCode)
      if (charIndex === -1) {
        return char
      }
      return String.fromCharCode(block[(charIndex + shift) % block.length])
    })
    .join('')
}

function encryptVigenere(value, params) {
  const key = params?.key ?? ''
  return value
    .split('')
    .map((char, i) => {
      const charCode = char.charCodeAt(0)
      const keyCode = key.charCodeAt(i % key.length)
      const block = find(charCode)
      if (!block) {
        return char
      }
      const charIndex = block.indexOf(charCode)
      const keyIndex = block.indexOf(keyCode)
      if (charIndex === -1 || keyIndex === -1) {
        return char
      }
      return String.fromCharCode(block[(charIndex + keyIndex) % block.length])
    })
    .join('')
}

function encryptVernam(value, params) {
  const key = params?.key ?? ''
  return value
    .split('')
    .map((char, i) => {
      const charCode = char.charCodeAt(0)
      const keyCode = key.charCodeAt(i % key.length)
      const block = find(charCode)
      if (!block) {
        return char
      }
      const charIndex = block.indexOf(charCode)
      const keyIndex = block.indexOf(keyCode)
      if (charIndex === -1 || keyIndex === -1) {
        return char
      }
      return String.fromCharCode(block[(charIndex ^ keyIndex) % block.length])
    })
    .join('')
}
export { Ciphers, encrypt }
