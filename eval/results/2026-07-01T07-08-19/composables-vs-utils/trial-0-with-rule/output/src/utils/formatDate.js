export function formatDate(value, locale = 'en-US', options = { dateStyle: 'medium' }) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(locale, options).format(date)
}
