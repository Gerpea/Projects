import { BigNumber } from 'bignumber.js'
import { UnitTypes } from './types'
import { Unit } from './unit'

interface IUnit {
  value: BigNumber
  kind: UnitTypes
  to(kind: UnitTypes): IUnit
}

abstract class BaseUnit implements IUnit {
  value: BigNumber
  kind: UnitTypes
  koefs: Map<String, BigNumber>

  constructor(value: BigNumber | number, kind: UnitTypes, koefs: Map<String, BigNumber>) {
    this.value = new BigNumber(value)
    this.kind = kind
    this.koefs = koefs
  }

  to(kind: UnitTypes): IUnit {
    let newValue
    try {
      newValue = this.convertTo(kind)
    } catch {
      throw new Error(`New unit must be the same type as this, but it is ${kind}`)
    }
    return Unit.create(newValue, kind)
  }

  protected convertTo(kind: UnitTypes): BigNumber {
    const currentKoef = this.koefs.get(this.kind)
    const newKoef = this.koefs.get(kind)

    if (!(currentKoef && newKoef)) {
      throw new Error(`Cannot convert ${this.kind} to ${kind}`)
    }

    return this.value.times(newKoef.div(currentKoef))
  }

  toString() {
    return `${this.value} ${this.kind}`
  }
}

export { BaseUnit }
