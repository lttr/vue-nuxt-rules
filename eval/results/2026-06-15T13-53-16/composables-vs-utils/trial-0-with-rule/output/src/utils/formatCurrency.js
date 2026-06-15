/**
 * Format a numeric value as a currency string.
 *
 * @example
 * formatCurrency(1234.5) // "$1,234.50"
 *
 * @param {number} value - The amount to format.
 * @param {object} [options]
 * @param {string} [options.currency='USD'] - ISO 4217 currency code.
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(value, { currency = 'USD', locale = 'en-US' } = {}) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}
