import BigNumber from 'bignumber.js'
import SyntaxToken from './syntaxToken'
import SyntaxKind from './syntaxKind'
import { isDigit, isWhiteSpace } from './utils.js'

class Lexer {
  constructor(text) {
    this.text = text
    this.position = 0
    this.diagnostics = []
  }

  get current() {
    if (this.position >= this.text.length) {
      return '\0'
    }

    return this.text[this.position]
  }

  next() {
    this.position++
  }

  nextToken() {
    if (this.position >= this.text.length) {
      return new SyntaxToken(SyntaxKind.EndOfFileToken, this.position, '\0', null)
    }

    if (isDigit(this.current)) {
      const start = this.position

      while (isDigit(this.current)) {
        this.next()
      }

      const length = this.position - start
      const text = this.text.substr(start, length)
      const value = new BigNumber(text)

      return new SyntaxToken(SyntaxKind.NumberToken, start, text, value)
    }

    if (isWhiteSpace(this.current)) {
      const start = this.position

      while (isWhiteSpace(this.current)) {
        this.next()
      }

      const length = this.position - start
      const text = this.text.substr(start, length)

      return new SyntaxToken(SyntaxKind.WhitespaceToken, start, text, null)
    }

    if (this.current === '+') {
      return new SyntaxToken(SyntaxKind.PlusToken, this.position++, '+', null)
    } else if (this.current === '-') {
      return new SyntaxToken(SyntaxKind.MinusToken, this.position++, '-', null)
    } else if (this.current === '*') {
      return new SyntaxToken(SyntaxKind.TimesToken, this.position++, '*', null)
    } else if (this.current === '/') {
      return new SyntaxToken(SyntaxKind.DivideToken, this.position++, '/', null)
    } else if (this.current === '(') {
      return new SyntaxToken(SyntaxKind.OpenParenthesisToken, this.position++, '(', null)
    } else if (this.current === ')') {
      return new SyntaxToken(SyntaxKind.CloseParenthesisToken, this.position++, ')', null)
    }

    this.diagnostics.push(`ERROR: Bad character input: ${this.current}`)

    return new SyntaxToken(
      SyntaxToken.BadToken,
      this.position++,
      this.text.substr(this.position - 1, 1),
      null
    )
  }
}

export default Lexer
