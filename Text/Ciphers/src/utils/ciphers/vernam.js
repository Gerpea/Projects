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
      let encCode = block[charIndex ^ keyIndex]
      if (!encCode) {
        return char
      }
      return String.fromCharCode(encCode)
    })
    .join('')
}

function decrypt(value, params) {
  return encrypt(value, params)
}

export { encrypt, decrypt }
