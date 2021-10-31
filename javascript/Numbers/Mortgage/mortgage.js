const BigNumber = require('bignumber.js')

const { BNe, BN1 } = require('./bigMath')

class Calculator {
  constructor(type, props) {
    switch (type) {
      case Calculator.Types.fixed:
        return new FixedMortgage(props)
      case Calculator.Types.compound:
        return new CompoundMortgage(props)
      default:
        throw new Error(`Calculator with type: ${type} is not defined`)
    }
  }

  static Types = Object.freeze({
    fixed: 0,
    compound: 1,
  })

  static CompoundIntervals = Object.freeze({
    Annualy: 1,
    Monthly: 12,
    Weekly: 48,
    Daily: 360,
    Continually: 0,
  })
}

class Mortgage {
  constructor(loan, r, terms) {
    this.loan = loan
    this.r = r
    this.terms = terms
  }

  monthlyPayment() {
    throw new Error('This method should be implemented')
  }

  totalAmount() {
    throw new Error('This method should be implemented')
  }

  howLong() {
    throw new Error('This method should be implemented')
  }
}

class FixedMortgage extends Mortgage {
  constructor({ loan, r, terms }) {
    super(loan, r.div(12), terms)
  }

  monthlyPayment() {
    if (this.r.eq(0)) {
      return this.loan.div(this.terms)
    }

    return this.totalAmount().div(this.terms)
  }

  totalAmount() {
    return this.loan.times(this.r.times(this.terms).plus(1))
  }

  howLong() {
    return new BigNumber(1).div(this.r).times(this.totalAmount().div(this.loan.minus(1)))
  }
}

class CompoundMortgage extends Mortgage {
  constructor({ loan, r, terms, compound }) {
    super(loan, r, terms.div(12))
    this.compound = compound
  }

  monthlyPayment() {
    if (this.compound === Calculator.CompoundIntervals.Continually) {
      return this.loan
        .times(this.r)
        .div(
          BN1.minus(
            BN1.div(BN1.plus(this.r).topow(this.terms.times(BNe.topow(this.terms.times(this.r)))))
          )
        )
    }

    return this.loan
      .times(this.r)
      .div(BN1.minus(BN1.div(BN1.plus(this.r).topow(this.terms.times(this.compound)))))
  }

  totalAmount() {
    if (this.compound === Calculator.CompoundIntervals.Continually) {
      return this.loan.times(BNe.topow(this.terms.times(this.r)))
    }

    return this.loan.times(this.r.div(this.compound).plus(1).topow(this.terms.times(this.compound)))
  }

  howLong() {
    if (this.compound === Calculator.CompoundIntervals.Continually) {
      return this.totalAmount().div(this.loan).log(BNe).div(this.r)
    }

    return this.totalAmount()
      .log(BNe)
      .minus(this.loan.log(BNe))
      .div(this.r.div(this.compound).plus(1).log(BNe))
  }
}

module.exports = { Calculator }
