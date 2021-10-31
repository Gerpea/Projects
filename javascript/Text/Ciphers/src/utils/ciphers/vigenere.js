import { find } from '../charTables'

function encrypt(value, params) {
  const key = (params?.key ?? '').toString()
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

function decrypt(value, params) {
  const key = (params?.key ?? '').toString()
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
      return String.fromCharCode(block[(charIndex - keyIndex + block.length) % block.length])
    })
    .join('')
}

export { encrypt, decrypt }
