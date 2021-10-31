import { BigNumber } from 'bignumber.js'
import { BaseUnit } from './baseUnit'
import { lengths, LengthTypes } from './types'

const koefs = new Map<LengthTypes, BigNumber>([
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

class LengthUnit extends BaseUnit {
  constructor(value: BigNumber | number, kind: LengthTypes) {
    super(value, kind, koefs)
  }
}

function isOfTypeLength(kind: LengthTypes) {
  return (lengths as readonly LengthTypes[]).includes(kind)
}

export { LengthUnit, isOfTypeLength }
