import { BigNumber } from 'bignumber.js'

import { UnitTypes } from './types'
import { isOfTypeLength, LengthTypes, LengthUnit } from './lengths'
import { isOfTypeWeight, WeightTypes, WeightUnit } from './weights'

interface IUnit {
  value: BigNumber
  kind: UnitTypes
  to(kind: UnitTypes): IUnit
}

abstract class Unit {
  static create(value: BigNumber, kind: UnitTypes): IUnit {
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

export { Unit, IUnit }
