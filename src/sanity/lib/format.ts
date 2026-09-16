export function formatEUR(value: number) {
  return `€${value.toFixed(2)}`
}

export function calculateDiscountPercent(original: number, sale: number) {
  if (!sale || sale >= original) return 0
  return Math.round(((original - sale) / original) * 100)
}