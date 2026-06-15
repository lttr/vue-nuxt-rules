/**
 * Format a numeric value as a currency string.
 *
 * @param {number} value - The amount to format, e.g. 1234.5
 * @param {object} [options]
 * @param {string} [options.currency='USD'] - ISO 4217 currency code.
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @returns {string} The formatted currency, e.g. "$1,234.50"
 */
export function formatCurrency(value, { currency = 'USD', locale = 'en-US' } = {}) {
  if (value == null || Number.isNaN(Number(value))) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(Number(value))
}
