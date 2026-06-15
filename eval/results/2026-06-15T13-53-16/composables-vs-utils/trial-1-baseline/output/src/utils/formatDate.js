/**
 * Format a date value into a human-readable string.
 *
 * @param {Date|string|number} value - A Date, ISO string, or timestamp.
 * @param {object} [options]
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {Intl.DateTimeFormatOptions} [options.format] - Intl formatting options.
 * @returns {string} The formatted date, e.g. "Jun 15, 2026"
 */
export function formatDate(value, { locale = 'en-US', format } = {}) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const formatOptions = format ?? {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(date)
}
