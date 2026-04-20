export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatDate(value, options = {}, locale = 'en-US') {
  const date = value instanceof Date ? value : new Date(value)
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat(locale, { ...defaults, ...options }).format(date)
}
