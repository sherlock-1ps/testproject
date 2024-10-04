import { range } from 'lodash-es'
import Numeral from 'numeral'

export const formatNoRound = (value: string | number, decimals = 2, fixed = false) => {
  const zeroDecimal = range(0, decimals).reduce<string>((zero) => (zero += '0'), '')
  if (fixed) return Numeral(value).format(`0,0.${zeroDecimal}`)
  return Numeral(value).format(`0,0.[${zeroDecimal}]`, (n: number) => Math.floor(n))
}

export const formatPrice = (value: string | number, decimals = 2, fixed = true) => {
  return formatNoRound(value, decimals, fixed)
}
