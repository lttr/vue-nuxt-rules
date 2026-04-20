export function formatDate(value, { locale = 'en-US', ...options } = {}) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`formatDate: invalid date value ${value}`)
  }
  const formatOptions = Object.keys(options).length
    ? options
    : { year: 'numeric', month: 'short', day: '2-digit' }
  return new Intl.DateTimeFormat(locale, formatOptions).format(date)
}
