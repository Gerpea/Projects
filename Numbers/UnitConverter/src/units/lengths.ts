import { BigNumber } from 'bignumber.js'
import { IUnit } from './unit'

const koefs = new Map<string, BigNumber>([
  ['Tm', new BigNumber('1e-12')],
  ['Gm', new BigNumber('1e-9')],
  ['Mm', new BigNumber('1e-6')],
  ['km', new BigNumber('1e-3')],
  ['hm', new BigNumber('1e-2')],
  ['dam', new BigNumber('1e-1')],
  ['m', new BigNumber('1')],
  ['dm', new BigNumber('1e1')],
  ['cm', new BigNumber('1e2')],
  ['mm', new BigNumber('1e3')],
  ['um', new BigNumber('1e6')],
  ['nm', new BigNumber('1e9')],
  ['pm', new BigNumber('1e12')],
])
const lengths = [
  'Tm',
  'Gm',
  'Mm',
  'km',
  'hm',
  'dam',
  'm',
  'dm',
  'cm',
  'mm',
  'um',
  'nm',
  'pm',
] as const

type LengthTypes = typeof lengths[number]

class LengthUnit implements IUnit {
  value: BigNumber
  kind: LengthTypes

  constructor(value: BigNumber, kind: LengthTypes) {
    this.value = new BigNumber(value)
    this.kind = kind
  }

  to(kind: LengthTypes): LengthUnit {
    if (!isOfTypeLength(kind)) {
      throw new Error(`New unit must be the same type as this, but it is ${kind}`)
    }

    return new LengthUnit(this.convertTo(kind as LengthTypes), kind as LengthTypes)
  }

  private convertTo(kind: LengthTypes): BigNumber {
    const currentKoef = koefs.get(this.kind)
    const newKoef = koefs.get(kind)

    if (!(currentKoef && newKoef)) {
      throw new Error(`Cannot convert ${this.kind} to ${kind}`)
    }

    return this.value.times(newKoef.div(currentKoef))
  }
}

function isOfTypeLength(kind: LengthTypes) {
  return (lengths as readonly LengthTypes[]).includes(kind)
}

export { LengthUnit, isOfTypeLength, LengthTypes }
