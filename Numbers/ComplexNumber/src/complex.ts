interface IComplexNumber {
  readonly re: number
  readonly im: number
  plus(number: IComplexNumber): IComplexNumber
  minus(number: IComplexNumber): IComplexNumber
  times(number: IComplexNumber): IComplexNumber
  div(number: IComplexNumber): IComplexNumber
  negate(): IComplexNumber
  inverse(): IComplexNumber
}

class ComplexNumber implements IComplexNumber {
  _re!: number
  _im!: number

  constructor()
  constructor(str: string)
  constructor(obj: IComplexNumber)
  constructor(re: number, im: number)
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

  get re() {
    return this._re
  }

  get im() {
    return this._im
  }

  plus(number: IComplexNumber): IComplexNumber {
    return new ComplexNumber(this._re + number.re, this._im + number.im)
  }

  minus(number: IComplexNumber): IComplexNumber {
    return new ComplexNumber(this._re - number.re, this._im - number.im)
  }

  times(number: IComplexNumber): IComplexNumber {
    return new ComplexNumber(
      this._re * number.re - this._im * number.im,
      this._im * number.re + this._re * number.im
    )
  }

  div(number: IComplexNumber): IComplexNumber {
    const denom = number.re * number.re + number.im * number.im
    const renom = this._re * number.re + this._im * number.im
    const imnom = this._im * number.re - this._re * number.im

    return new ComplexNumber(renom / denom, imnom / denom)
  }

  negate(): IComplexNumber {
    return new ComplexNumber(-this._re, -this._im)
  }

  inverse(): IComplexNumber {
    return new ComplexNumber(1, 0).div(this)
  }

  toString(): string {
    return `${this.formatNumber(this._re)} ${this._im < 0 ? '-' : '+'} ${this.formatNumber(
      Math.abs(this._im)
    )}i`
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
    this._re = re
    this._im = im
  }

  private initFromObject(obj: IComplexNumber) {
    this._re = obj.re
    this._im = obj.im
  }

  private initFromString(str: string) {
    const number = this.parse(str)
    this._re = number.re
    this._im = number.im
  }

  private initFromNothing() {
    this._re = 0
    this._im = 0
  }

  private parse(str: string): IComplexNumber {
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

    return new ComplexNumber(re, im)
  }

  private parseError() {
    return new SyntaxError('Invalid format')
  }

  private formatNumber(number: number) {
    return parseFloat(number.toFixed(2))
  }
}

export default ComplexNumber
