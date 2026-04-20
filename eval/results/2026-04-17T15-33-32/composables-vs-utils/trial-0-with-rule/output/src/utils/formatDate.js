export function formatDate(date, locale = 'en-US', options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(d);
}
