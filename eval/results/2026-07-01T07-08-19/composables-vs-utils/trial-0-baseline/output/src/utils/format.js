/**
 * Formats a number as a currency string.
 * @param {number} value - The numeric amount, e.g. 1234.5
 * @param {string} [locale='en-US'] - BCP 47 locale tag
 * @param {string} [currency='USD'] - ISO 4217 currency code
 * @returns {string} e.g. "$1,234.50"
 */
export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Formats a date value.
 * @param {Date|string|number} value - A Date object, ISO string, or timestamp
 * @param {string} [locale='en-US'] - BCP 47 locale tag
 * @param {Intl.DateTimeFormatOptions} [options] - Formatting options
 * @returns {string} e.g. "Jul 1, 2026"
 */
export function formatDate(
  value,
  locale = 'en-US',
  options = { year: 'numeric', month: 'short', day: 'numeric' }
) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(locale, options).format(date)
}
