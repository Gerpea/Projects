function ASCIIPunctuationAndsymbols() {
  return Array.from([
    ...[...Array(0x002f - 0x0020 + 1).keys()].map((i) => i + 0x0020),
    ...[...Array(0x0040 - 0x003a).keys()].map((i) => i + 0x003a),
    ...[...Array(0x0060 - 0x005b).keys()].map((i) => i + 0x005b),
    ...[...Array(0x007e - 0x007b).keys()].map((i) => i + 0x007b),
  ])
}
function ASCIIDigits() {
  return Array.from([...Array(0x0039 - 0x0030 + 1).keys()].map((i) => i + 0x0030))
}
function ASCIIAlphabetUppercase() {
  return Array.from([...Array(0x005a - 0x0041 + 1).keys()].map((i) => i + 0x0041))
}
function ASCIIAlphabetLowercase() {
  return Array.from([...Array(0x007a - 0x0061 + 1).keys()].map((i) => i + 0x0061))
}

const basicLatin = {
  punctuiationAndSymbols: ASCIIPunctuationAndsymbols(),
  digits: ASCIIDigits(),
  uppercase: ASCIIAlphabetUppercase(),
  lowercase: ASCIIAlphabetLowercase(),
}

export default basicLatin
