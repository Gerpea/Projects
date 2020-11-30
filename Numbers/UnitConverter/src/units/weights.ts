import { IUnit } from './unit'

const weights = ['t', 'kg', 'g', 'mg', 'ug', 'ng', 'pg'] as const
type WeightTypes = typeof weights[number]

class WeightUnit implements IUnit {
  value: number
  kind: WeightTypes

  constructor(value: number, kind: WeightTypes) {
    this.value = value
    this.kind = kind
  }

  to(kind: WeightTypes): WeightUnit {
    if (!isOfTypeWeight(kind)) {
      throw new Error(`New unit must be the same type as this, but it is ${kind}`)
    }

    return new WeightUnit(this.convertTo(kind as WeightTypes), kind as WeightTypes)
  }

  private convertTo(kind: WeightTypes): number {
    if (!(koefs.get(kind.toLowerCase()) && koefs.get(this.kind.toLowerCase()))) {
      throw new Error(`Cannot convert ${this.kind} to ${kind}`)
    }

    return this.value * (koefs.get(kind.toLowerCase())! / koefs.get(this.kind.toLowerCase())!)
  }
}

function isOfTypeWeight(kind: WeightTypes) {
  return (weights as readonly WeightTypes[]).includes(kind)
}

const koefs = new Map<string, number>([
  ['t', 1 / 1000],
  ['kg', 1],
  ['g', 1 * 1000],
  ['mg', 1 * 1000 * 1000],
  ['ug', 1 * 1000 * 1000 * 1000],
  ['ng', 1 * 1000 * 1000 * 1000],
  ['pg', 1 * 1000 * 1000 * 1000 * 1000],
])

export { WeightUnit, isOfTypeWeight, WeightTypes }
