// Formatea el precio en USDT
export function formatEUR(amount: number): string {
  return `${amount.toFixed(2)} USDT`
}

// Calcula el porcentaje de descuento
export function calculateDiscountPercent(originalPrice: number, salePrice: number): number {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Formatea precio con moneda personalizada
export function formatPrice(amount: number, currency: string = 'USDT'): string {
  return `${amount.toFixed(2)} ${currency}`
}