import SyntaxTree from './Analyzer/syntaxTree'
import Evaluator from './Analyzer/evaluator'

function calculate(text) {
  const syntaxTree = new SyntaxTree().parse(text)

  if (syntaxTree.diagnostics.length > 0) {
    return syntaxTree.diagnostics
  } else {
    const e = new Evaluator(syntaxTree.root)
    const result = e.evaluate()

    return result
  }
}

export default calculate
