export function formatDate(value, { locale = 'en-US', ...options } = {}) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const formatOptions = Object.keys(options).length
    ? options
    : { year: 'numeric', month: 'short', day: 'numeric' }

  return new Intl.DateTimeFormat(locale, formatOptions).format(date)
}
