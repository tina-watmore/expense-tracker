export function formatCurrency(
  value: number,
  locale: string = 'en-AU',
  currency: string = 'AUD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export function getPercentage(
  fixedCosts: number,
  income: number
): number {
  if (income === 0) return 0

  return (fixedCosts / income) * 100
}