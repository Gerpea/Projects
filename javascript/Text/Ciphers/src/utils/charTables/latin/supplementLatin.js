function Latin1PunctuationAndsymbols() {
  return Array.from([...[...Array(0x00bf - 0x00a0 + 1).keys()].map((i) => i + 0x00a0)])
}
function Latin1CapitalLetters() {
  return Array.from([
    ...[...Array(0x00d6 - 0x00c0 + 1).keys()].map((i) => i + 0x00c0),
    ...[...Array(0x00de - 0x00d8 + 1).keys()].map((i) => i + 0x00d8),
  ])
}
function Latin1SmallLetters() {
  return Array.from([
    ...[...Array(0x00f6 - 0x00df + 1).keys()].map((i) => i + 0x00df),
    ...[...Array(0x00ff - 0x00f8 + 1).keys()].map((i) => i + 0x00f8),
  ])
}
function Latin1Math() {
  return Array.from([
    ...[...Array(0x00d7).keys()].map((i) => i + 0x00d7),
    ...[...Array(0x00f7).keys()].map((i) => i + 0x00f7),
  ])
}

const supplementLatin = {
  punctuiationAndSymbols: Latin1PunctuationAndsymbols(),
  capital: Latin1CapitalLetters(),
  small: Latin1SmallLetters(),
  math: Latin1Math(),
}

export default supplementLatin
