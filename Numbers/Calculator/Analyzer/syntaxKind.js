const SyntaxKind = Object.freeze({
  BadToken: 'BadToken',
  EndOfFileToken: 'EndOfFileToken',

  NumberToken: 'NumberToken',
  WhitespaceToken: 'WhitespaceToken',
  PlusToken: 'PlusToken',
  MinusToken: 'MinusToken',
  TimesToken: 'TimesToken',
  DivideToken: 'DivideToken',
  OpenParenthesisToken: 'OpenParenthesisToken',
  CloseParenthesisToken: 'CloseParenthesisToken',

  BinaryExpression: 'BinaryExpression',
  NumberExpression: 'NumberExpression',
  ParenthesizedExpression: 'ParenthesizedExpression',
  UnaryExpression: 'UnaryExpression',
})

export default SyntaxKind
