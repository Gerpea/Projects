import { BigNumber } from 'bignumber.js'
import { IUnit } from './unit'

const koefs = new Map<string, BigNumber>([
  ['Mt', new BigNumber('1e-12')],
  ['t', new BigNumber('1e-6')],
  ['kg', new BigNumber('1e-3')],
  ['g', new BigNumber('1')],
  ['mg', new BigNumber('1e3')],
  ['ug', new BigNumber('1e6')],
  ['ng', new BigNumber('1e9')],
  ['pg', new BigNumber('1e12')],
])
const weights = ['Mt', 't', 'kg', 'g', 'mg', 'ug', 'ng', 'pg'] as const

type WeightTypes = typeof weights[number]

class WeightUnit implements IUnit {
  value: BigNumber
  kind: WeightTypes

  constructor(value: BigNumber, kind: WeightTypes) {
    this.value = new BigNumber(value)
    this.kind = kind
  }

  to(kind: WeightTypes): WeightUnit {
    if (!isOfTypeWeight(kind)) {
      throw new Error(`New unit must be the same type as this, but it is ${kind}`)
    }

    return new WeightUnit(this.convertTo(kind as WeightTypes), kind as WeightTypes)
  }

  private convertTo(kind: WeightTypes): BigNumber {
    const currentKoef = koefs.get(this.kind)
    const newKoef = koefs.get(kind)

    if (!(currentKoef && newKoef)) {
      throw new Error(`Cannot convert ${this.kind} to ${kind}`)
    }

    return this.value.times(newKoef.div(currentKoef))
  }
}

function isOfTypeWeight(kind: WeightTypes) {
  return (weights as readonly WeightTypes[]).includes(kind)
}

export { WeightUnit, isOfTypeWeight, WeightTypes }
