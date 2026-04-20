export function formatDate(value, { locale = 'en-US', ...options } = {}) {
  const date = value instanceof Date ? value : new Date(value)
  const opts = Object.keys(options).length
    ? options
    : { year: 'numeric', month: 'short', day: '2-digit' }
  return new Intl.DateTimeFormat(locale, opts).format(date)
}
