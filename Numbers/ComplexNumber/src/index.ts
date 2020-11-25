interface ComplexNumber {
  re: number
  im: number
}

class Complex implements ComplexNumber {
  re!: number
  im!: number

  constructor(re: number, im: number)
  constructor(obj: ComplexNumber)
  constructor(str: string)
  constructor()
  constructor(...args: Array<any>) {
    switch (args.length) {
      case 2:
        this.handleTwoArgs(args)
        break
      case 1:
        this.handleOneArg(args)
        break
      default:
        this.handleZeroArgs(args)
    }
  }

  private handleTwoArgs(args: Array<any>) {
    this.initFromNumbers(args[0], args[1])
  }

  private handleOneArg(args: Array<any>) {
    let arg = args[0]
    if (typeof arg === 'object') {
      this.initFromObject(arg)
    } else if (typeof arg === 'string') {
      this.initFromString(arg)
    }
  }

  private handleZeroArgs(args: Array<any>) {
    this.initFromNothing()
  }

  private initFromNumbers(re: number, im: number) {
    this.re = re
    this.im = im
  }

  private initFromObject(obj: ComplexNumber) {
    this.re = obj.re
    this.im = obj.im
  }

  private initFromString(str: string) {
    const number = this.parse(str)
    this.re = number.re
    this.im = number.im
  }

  private initFromNothing() {
    this.re = 0
    this.im = 0
  }

  private parse(str: string): ComplexNumber {
    let re = 0
    let im = 0

    var tokens = str.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g)
    var plus = 1
    var minus = 0

    if (tokens === null) {
      throw this.parseError()
    }

    for (var i = 0; i < tokens.length; i++) {
      let c = tokens[i]

      if (c === ' ' || c === '\t' || c === '\n') {
      } else if (c === '+') {
        plus++
      } else if (c === '-') {
        minus++
      } else if (c === 'i' || c === 'I') {
        if (plus + minus === 0) {
          throw this.parseError()
        }

        if (tokens[i + 1] !== ' ' && !isNaN(parseFloat(tokens[i + 1]))) {
          im += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1])
          i++
        } else {
          im += parseFloat((minus % 2 ? '-' : '') + '1')
        }
        plus = minus = 0
      } else {
        if (plus + minus === 0 || isNaN(parseFloat(c))) {
          throw this.parseError()
        }

        if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
          im += parseFloat((minus % 2 ? '-' : '') + c)
          i++
        } else {
          re += parseFloat((minus % 2 ? '-' : '') + c)
        }
        plus = minus = 0
      }
    }

    if (plus + minus > 0) {
      throw this.parseError()
    }

    return {
      re,
      im,
    }
  }

  private parseError() {
    return new SyntaxError('Invalid format')
  }

  plus(number: ComplexNumber): Complex {
    return new Complex(this.re + number.re, this.im + number.im)
  }

  minus(number: ComplexNumber): Complex {
    return new Complex(this.re - number.re, this.im - number.im)
  }

  times(number: ComplexNumber): Complex {
    return new Complex(
      this.re * number.re - this.im * number.im,
      this.im * number.re + this.re * number.im
    )
  }

  div(number: ComplexNumber): Complex {
    return this.inverse().times(number)
  }

  negate(): Complex {
    return new Complex(-this.re, -this.im)
  }

  inverse(): Complex {
    return new Complex(1 / this.re, 1 / this.im)
  }

  toString(): string {
    return `${this.re.toFixed(2)} ${this.im < 0 ? '-' : '+'} ${Math.abs(this.im).toFixed(2)}i`
  }
}

const a = new Complex('1 + 2i')
const b = new Complex(1, 3)

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
