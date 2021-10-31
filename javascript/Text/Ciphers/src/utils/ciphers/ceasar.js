import { find } from '../charTables'

function encrypt(value, params) {
  const shift = parseInt(params?.key || 0) || 0
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
      if (charIndex + shift < 0) {
        return String.fromCharCode(block[(block.length + (charIndex + shift)) % block.length])
      }
      return String.fromCharCode(block[(charIndex + shift) % block.length])
    })
    .join('')
}

function decrypt(value, params) {
  const shift = parseInt(params?.key || 0) || 0
  return encrypt(value, { key: -shift })
}

export { encrypt, decrypt }
