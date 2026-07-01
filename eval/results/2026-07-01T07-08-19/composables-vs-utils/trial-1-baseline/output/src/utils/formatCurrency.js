export function formatCurrency(value, { locale = 'en-US', currency = 'USD' } = {}) {
  const amount = Number(value)
  if (Number.isNaN(amount)) return ''

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
