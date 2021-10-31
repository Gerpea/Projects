import Parser from './parser'

class SyntaxTree {
  constructor(diagnostics, root, endOfFileToken) {
    this.diagnostics = diagnostics
    this.root = root
    this.endOfFileToken = endOfFileToken
  }

  parse(text) {
    const parser = new Parser(text)
    return parser.parse()
  }
}

export default SyntaxTree
