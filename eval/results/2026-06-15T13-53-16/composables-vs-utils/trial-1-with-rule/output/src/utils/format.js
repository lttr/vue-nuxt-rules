/**
 * Plain formatting utilities. No reactivity or lifecycle needed, so these are
 * ordinary functions per the project's composables-vs-utils rule.
 */

/**
 * Format a numeric value as currency, e.g. 1234.5 -> "$1,234.50".
 *
 * @param {number} value - The amount to format.
 * @param {object} [options]
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {string} [options.currency='USD'] - ISO 4217 currency code.
 * @returns {string} The formatted currency string, or an empty string for
 *   non-finite input.
 */
export function formatCurrency(value, { locale = 'en-US', currency = 'USD' } = {}) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return ''
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

/**
 * Format a date, e.g. "Jun 15, 2026".
 *
 * @param {Date|string|number} input - A Date, parseable date string, or epoch ms.
 * @param {object} [options]
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {Intl.DateTimeFormatOptions} [options.dateStyle] - Intl options;
 *   defaults to a medium date style.
 * @returns {string} The formatted date, or an empty string for invalid input.
 */
export function formatDate(input, { locale = 'en-US', ...intlOptions } = {}) {
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return ''

  const options = Object.keys(intlOptions).length ? intlOptions : { dateStyle: 'medium' }
  return new Intl.DateTimeFormat(locale, options).format(date)
}
