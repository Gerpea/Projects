import ComplexNumber from './complex'

const a = new ComplexNumber('1 + 2i')
const b = new ComplexNumber(1, 3)

console.log(`a = ${a}`)
console.log(`b = ${b}`)

console.log()

console.log(`a + b = ${a.plus(b)}`)
console.log(`a - b = ${a.minus(b)}`)

console.log()

console.log(`a * b = ${a.times(b)}`)
console.log(`a / b = ${a.div(b)}`)

console.log()

console.log(`-a = ${a.negate()}`)
console.log(`-b = ${b.negate()}`)

console.log()

console.log(`1/a = ${a.inverse()}`)
console.log(`1/b = ${b.inverse()}`)
