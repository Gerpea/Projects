import SyntaxKind from './syntaxKind'

function getBinaryOperatorPrecedence(kind) {
  switch (kind) {
    case SyntaxKind.PlusToken:
    case SyntaxKind.MinusToken:
      return 1

    case SyntaxKind.TimesToken:
    case SyntaxKind.DivideToken:
      return 2

    default:
      return 0
  }
}

function getUnaryOperatorPrecedence(kind) {
  switch (kind) {
    case SyntaxKind.PlusToken:
    case SyntaxKind.MinusToken:
      return 3

    default:
      return 0
  }
}

export { getBinaryOperatorPrecedence, getUnaryOperatorPrecedence }
