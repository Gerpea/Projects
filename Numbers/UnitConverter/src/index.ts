import { getInput } from './prompt'
import { LengthUnit } from './units/lengths'
import { Unit } from './units/unit'
;(async () => {
  try {
    const from = await getInput('Enter unit to convert from')
    const to = await getInput('Enter unit to convert to')
    const value = await getInput('Enter value')
    const fromUnit = Unit.create(value, from)
    const toUnit = fromUnit.to(to)

    console.log(`${fromUnit.value} ${fromUnit.kind} = ${toUnit.value} ${toUnit.kind}`)
  } catch (e) {
    console.log(e.message)
  }
})()
