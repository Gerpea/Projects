import Lexer from './lexer'
import SyntaxKind from './syntaxKind'
import SyntaxToken from './syntaxToken'
import SyntaxTree from './syntaxTree'
import {
  NumberExpressionSyntax,
  ParenthesizedExpressionSyntax,
  BinaryExpressionSyntax,
} from './expressionSyntax'

class Parser {
  constructor(text) {
    this.tokens = []
    this.position = 0
    this.diagnostics = []

    const lexer = new Lexer(text)
    let token

    console.log(SyntaxKind.WhitespaceToken)
    do {
      token = lexer.nextToken()
      if (token.kind !== SyntaxKind.WhitespaceToken && token.kind !== SyntaxKind.BadToken) {
        this.tokens.push(token)
      }
    } while (token.kind !== SyntaxKind.EndOfFileToken)
  }

  peek(offset) {
    const index = this.position + offset
    if (index > this.tokens.length) {
      return this.tokens[this.tokens.length - 1]
    }

    return this.tokens[index]
  }

  get current() {
    return this.peek(0)
  }

  nextToken() {
    const current = this.current
    this.position++

    return current
  }

  match(kind) {
    if (this.current.kind === kind) {
      return this.nextToken()
    }

    this.diagnostics.push(`ERROR: Unexpected token ${this.current.kind} expected ${kind}`)
    return new SyntaxToken(kind, this.current.position, null, null)
  }

  parse() {
    const expression = this.parseTerm()
    const endOfFileToken = this.match(SyntaxKind.EndOfFileToken)

    return new SyntaxTree(this.diagnostics, expression, endOfFileToken)
  }

  parseTerm() {
    let left = this.parseFactor()

    while (
      this.current.kind == SyntaxKind.PlusToken ||
      this.current.kind == SyntaxKind.MinusToken
    ) {
      const operatorToken = this.nextToken()
      const right = this.parseFactor()
      left = new BinaryExpressionSyntax(left, operatorToken, right)
    }

    return left
  }

  parseFactor() {
    let left = this.parsePrimaryExpression()

    while (
      this.current.kind == SyntaxKind.TimesToken ||
      this.current.kind == SyntaxKind.DivideToken
    ) {
      const operatorToken = this.nextToken()
      const right = this.parsePrimaryExpression()
      left = new BinaryExpressionSyntax(left, operatorToken, right)
    }

    return left
  }

  parsePrimaryExpression() {
    if (this.current.kind === SyntaxKind.OpenParenthesisToken) {
      const left = this.nextToken()
      const expression = this.parseExpression()
      const right = this.match(SyntaxKind.CloseParenthesisToken)

      return new ParenthesizedExpressionSyntax(left, expression, right)
    }

    const numberToken = this.match(SyntaxKind.NumberToken)
    return new NumberExpressionSyntax(numberToken)
  }

  parseExpression() {
    return this.parseTerm()
  }
}

export default Parser
