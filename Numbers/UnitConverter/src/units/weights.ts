import { BigNumber } from 'bignumber.js'

import { BaseUnit } from './baseUnit'
import { weights, WeightTypes } from './types'

const koefs = new Map<WeightTypes, BigNumber>([
  ['Mt', new BigNumber('1e-12')],
  ['t', new BigNumber('1e-6')],
  ['kg', new BigNumber('1e-3')],
  ['g', new BigNumber('1')],
  ['mg', new BigNumber('1e3')],
  ['ug', new BigNumber('1e6')],
  ['ng', new BigNumber('1e9')],
  ['pg', new BigNumber('1e12')],
])

class WeightUnit extends BaseUnit {
  constructor(value: BigNumber | number, kind: WeightTypes) {
    super(value, kind, koefs)
  }
}

function isOfTypeWeight(kind: WeightTypes) {
  return (weights as readonly WeightTypes[]).includes(kind)
}

export { WeightUnit, isOfTypeWeight }
