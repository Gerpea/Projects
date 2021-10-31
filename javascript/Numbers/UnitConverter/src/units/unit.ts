import { BigNumber } from 'bignumber.js'

import { LengthTypes, UnitTypes, WeightTypes } from './types'
import { isOfTypeLength, LengthUnit } from './lengths'
import { isOfTypeWeight, WeightUnit } from './weights'
import { BaseUnit } from './baseUnit'

abstract class Unit {
  static create(value: BigNumber | number, kind: UnitTypes): BaseUnit {
    switch (getType(kind)) {
      case LengthUnit:
        return new LengthUnit(value, kind as LengthTypes)
      case WeightUnit:
        return new WeightUnit(value, kind as WeightTypes)
      default:
        throw new Error(`I dont know this type of unit: ${kind}`)
    }
  }
}

function getType(kind: UnitTypes) {
  if (isOfTypeLength(kind as LengthTypes)) {
    return LengthUnit
  } else if (isOfTypeWeight(kind as WeightTypes)) {
    return WeightUnit
  }
}

export { Unit }
