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

const weights = ['Mt', 't', 'kg', 'g', 'mg', 'ug', 'ng', 'pg'] as const

type LengthTypes = typeof lengths[number]
type WeightTypes = typeof weights[number]

type UnitTypes = LengthTypes | WeightTypes

export { UnitTypes, LengthTypes, WeightTypes, lengths, weights }
