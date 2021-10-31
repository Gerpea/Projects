import {
  NumberExpressionSyntax,
  BinaryExpressionSyntax,
  ParenthesizedExpressionSyntax,
  UnaryExpressionSyntax,
} from './expressionSyntax'
import SyntaxKind from './syntaxKind'

class Evaluator {
  constructor(root) {
    this.root = root
  }

  evaluate() {
    return this.evaluateExpression(this.root).toString()
  }

  evaluateExpression(root) {
    if (root instanceof NumberExpressionSyntax) {
      return root.numberToken.value
    }

    if (root instanceof UnaryExpressionSyntax) {
      const operand = this.evaluateExpression(root.operand)

      if (root.operatorToken.kind == SyntaxKind.PlusToken) {
        return operand
      }

      if (root.operatorToken.kind == SyntaxKind.MinusToken) {
        return operand.negated()
      }
    }

    if (root instanceof BinaryExpressionSyntax) {
      const left = this.evaluateExpression(root.left)
      const right = this.evaluateExpression(root.right)

      if (root.operatorToken.kind == SyntaxKind.PlusToken) {
        return left.plus(right)
      } else if (root.operatorToken.kind == SyntaxKind.MinusToken) {
        return left.minus(right)
      } else if (root.operatorToken.kind == SyntaxKind.TimesToken) {
        return left.times(right)
      } else if (root.operatorToken.kind == SyntaxKind.DivideToken) {
        return left.div(right)
      }
    }

    if (root instanceof ParenthesizedExpressionSyntax) {
      return this.evaluateExpression(root.epression)
    }
  }
}

export default Evaluator
