export function formatEUR(amount: number): string {
  return `${amount.toFixed(2)} USDT`
}

export function formatPrice(amount: number, currency: string = 'USDT'): string {
  return `${amount.toFixed(2)} ${currency}`
}