export function formatCurrency(value, { locale = 'en-US', currency = 'USD' } = {}) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(number)) {
    throw new TypeError(`formatCurrency: expected a finite number, received ${value}`)
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(number)
}
