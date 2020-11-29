import { UnitTypes } from './types'

import { isOfTypeLength, LengthTypes, LengthUnit } from './lengths'
import { isOfTypeWeight, WeightTypes, WeightUnit } from './weights'

interface IUnit {
  value: number
  kind: UnitTypes
  to(kind: UnitTypes): IUnit
}

abstract class Unit {
  static create(value: number, kind: UnitTypes): IUnit {
    console.log(value)
    switch (getType(kind)) {
      case LengthUnit:
        return new LengthUnit(value, kind as LengthTypes)
      case WeightUnit:
        return new WeightUnit(value, kind as WeightTypes)
      default:
        throw new Error('I dont know this type of unit')
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
