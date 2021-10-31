function isDigit(char) {
  if (char === '.') {
    return true
  }

  const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  return !!a[char]
}

function isWhiteSpace(char) {
  return char === ' '
}

export { isDigit, isWhiteSpace }
