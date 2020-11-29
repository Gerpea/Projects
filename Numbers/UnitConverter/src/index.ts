import { LengthUnit } from './units/lengths'
import { Unit } from './units/unit'
import { WeightTypes, WeightUnit } from './units/weights'

const meter = Unit.create(1, 'm') as LengthUnit
const kilo = Unit.create(1, 'kg') as WeightUnit

console.log('one meter is')
console.log(meter.to('dm'), 'dm')
console.log(meter.to('cm'), 'cm')
console.log(meter.to('mm'), 'mm')
console.log(meter.to('dam'), 'dam')
console.log(meter.to('hm'), 'hm')
console.log(meter.to('km'), 'km')

console.log('one kilo is')
console.log(kilo.to('g'), 'g')
console.log(kilo.to('mg'), 'mg')
console.log(kilo.to('ug'), 'ug')
console.log(kilo.to('ng'), 'ng')
console.log(kilo.to('pg'), 'pg')
console.log(kilo.to('t'), 't')
