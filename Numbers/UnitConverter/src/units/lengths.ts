import { IUnit } from './unit'

const lengths = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'] as const
type LengthTypes = typeof lengths[number]

class LengthUnit implements IUnit {
  value: number
  kind: LengthTypes

  constructor(value: number, kind: LengthTypes) {
    this.value = value
    this.kind = kind
  }

  to(kind: LengthTypes): LengthUnit {
    if (!isOfTypeLength(kind)) {
      throw new Error('New unit must be the same type as this')
    }

    return new LengthUnit(this.convertTo(kind as LengthTypes), kind as LengthTypes)
  }

  private convertTo(kind: LengthTypes): number {
    if (!(koefs.get(kind.toLowerCase()) && koefs.get(this.kind.toLowerCase()))) {
      throw new Error('Cannot convert to this type of unit')
    }

    return this.value * (koefs.get(kind.toLowerCase())! / koefs.get(this.kind.toLowerCase())!)
  }
}

const koefs = new Map<string, number>([
  ['km', 1 / 1000],
  ['hm', 1 / 100],
  ['dam', 1 / 10],
  ['m', 1],
  ['dm', 10],
  ['cm', 100],
  ['mm', 1000],
])

function isOfTypeLength(kind: LengthTypes) {
  return (lengths as readonly LengthTypes[]).includes(kind)
}

export { LengthUnit, isOfTypeLength, LengthTypes }
