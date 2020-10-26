import Lexer from './lexer'
import SyntaxKind from './syntaxKind'
import SyntaxToken from './syntaxToken'
import SyntaxTree from './syntaxTree'
import {
  NumberExpressionSyntax,
  ParenthesizedExpressionSyntax,
  BinaryExpressionSyntax,
  UnaryExpressionSyntax,
} from './expressionSyntax'
import { getBinaryOperatorPrecedence, getUnaryOperatorPrecedence } from './precedence'

class Parser {
  constructor(text) {
    this.tokens = []
    this.position = 0
    this.diagnostics = []

    const lexer = new Lexer(text)
    let token

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

  matchToken(kind) {
    if (this.current.kind === kind) {
      return this.nextToken()
    }

    this.diagnostics.push(`ERROR: Unexpected token ${this.current.kind} expected ${kind}`)
    return new SyntaxToken(kind, this.current.position, null, null)
  }

  parse() {
    const expression = this.parseExpression()
    const endOfFileToken = this.matchToken(SyntaxKind.EndOfFileToken)

    return new SyntaxTree(this.diagnostics, expression, endOfFileToken)
  }

  parseExpression(parentPrecedence = 0) {
    let left

    const unaryOperatorPrecedence = getUnaryOperatorPrecedence(this.current.kind)
    if (unaryOperatorPrecedence !== 0 && unaryOperatorPrecedence >= parentPrecedence) {
      const operatorToken = this.nextToken()
      const operand = this.parseExpression(unaryOperatorPrecedence)
      left = new UnaryExpressionSyntax(operatorToken, operand)
    } else {
      left = this.parsePrimaryExpression()
    }

    while (true) {
      const precedence = getBinaryOperatorPrecedence(this.current.kind)
      if (precedence === 0 || precedence <= parentPrecedence) {
        break
      }

      const operatorToken = this.nextToken()
      const right = this.parseExpression(precedence)
      left = new BinaryExpressionSyntax(left, operatorToken, right)
    }

    return left
  }

  parsePrimaryExpression() {
    if (this.current.kind === SyntaxKind.OpenParenthesisToken) {
      const left = this.nextToken()
      const expression = this.parseExpression()
      const right = this.matchToken(SyntaxKind.CloseParenthesisToken)

      return new ParenthesizedExpressionSyntax(left, expression, right)
    }

    const numberToken = this.matchToken(SyntaxKind.NumberToken)
    return new NumberExpressionSyntax(numberToken)
  }
}

export default Parser
