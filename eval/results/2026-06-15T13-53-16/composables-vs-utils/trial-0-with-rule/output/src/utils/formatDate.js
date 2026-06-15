/**
 * Format a date as a human-readable string.
 *
 * @example
 * formatDate('2026-06-15') // "Jun 15, 2026"
 *
 * @param {Date|string|number} input - A Date, ISO string, or timestamp.
 * @param {object} [options]
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {Intl.DateTimeFormatOptions} [options.format] - Intl formatting options.
 * @returns {string} The formatted date, or '' for invalid input.
 */
export function formatDate(input, { locale = 'en-US', format } = {}) {
  const date = input instanceof Date ? input : new Date(input)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const dateFormat = format ?? { year: 'numeric', month: 'short', day: 'numeric' }

  return new Intl.DateTimeFormat(locale, dateFormat).format(date)
}
