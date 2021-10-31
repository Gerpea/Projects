const math = require('mathjs')

function calculateLimit(expression, limit) {
  const node = math.parse(expression)
  const func = node.compile().evaluate()
  let result = NaN

  if (typeof func !== 'function') {
    result = func
  } else {
    result = func(limit)
  }

  if (!isNaN(result)) {
    return result.toFixed(2)
  }

  return calculateLimit(getDerivative(node).toString(), limit)
}

function getDerivative(node) {
  if (node.expr.op === '/') {
    node.expr.args[0] = math.derivative(node.expr.args[0], node.params[0])
    node.expr.args[1] = math.derivative(node.expr.args[1], node.params[0])
  } else {
    node = math.derivative(node, node.params[0])
  }

  return node
}

module.exports = { calculateLimit }
