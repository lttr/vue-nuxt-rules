export function formatCurrency(value, { locale = 'en-US', currency = 'USD' } = {}) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(number)) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(number)
}

export function formatDate(value, { locale = 'en-US', ...options } = {}) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const opts = Object.keys(options).length
    ? options
    : { year: 'numeric', month: 'short', day: 'numeric' }
  return new Intl.DateTimeFormat(locale, opts).format(date)
}
