import SyntaxKind from './syntaxKind'

class ExpressionSyntax {
  kind() {}

  *getChildren() {}
}

class NumberExpressionSyntax extends ExpressionSyntax {
  constructor(numberToken) {
    super(numberToken)

    this.numberToken = numberToken
  }

  kind() {
    return SyntaxKind.NumberExpression
  }

  *getChildren() {
    yield this.numberToken
  }
}

class BinaryExpressionSyntax extends ExpressionSyntax {
  constructor(left, operatorToken, right) {
    super(left, operatorToken, right)

    this.left = left
    this.operatorToken = operatorToken
    this.right = right
  }

  kind() {
    return SyntaxKind.BinaryExpression
  }

  *getChildren() {
    yield this.left
    yield this.operatorToken
    yield this.right
  }
}

class ParenthesizedExpressionSyntax extends ExpressionSyntax {
  constructor(openParenthesisToken, epression, closeParenthesisToken) {
    super(openParenthesisToken, epression, closeParenthesisToken)

    this.openParenthesisToken = openParenthesisToken
    this.epression = epression
    this.closeParenthesisToken = closeParenthesisToken
  }
  kind() {
    return SyntaxKind.ParenthesizedExpression
  }

  *getChildren() {
    yield this.openParenthesisToken
    yield this.expression
    yield this.closeParenthesisToken
  }
}

class UnaryExpressionSyntax extends ExpressionSyntax {
  constructor(operatorToken, operand) {
    super(operatorToken, operand)

    this.operatorToken = operatorToken
    this.operand = operand
  }

  kind() {
    return SyntaxKind.UnaryExpression
  }

  *getChildren() {
    yield this.operatorToken
    yield this.operand
  }
}

export {
  BinaryExpressionSyntax,
  NumberExpressionSyntax,
  ParenthesizedExpressionSyntax,
  UnaryExpressionSyntax,
}
