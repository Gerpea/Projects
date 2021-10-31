class SyntaxToken {
  constructor(kind, position, text, value) {
    this.kind = kind
    this.position = position
    this.text = text
    this.value = value
  }
}

export default SyntaxToken
