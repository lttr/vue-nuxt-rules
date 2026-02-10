/**
 * Formats a numeric value as a USD currency string.
 *
 * @param {number} value - The number to format.
 * @param {string} [locale='en-US'] - BCP 47 locale tag.
 * @param {string} [currency='USD'] - ISO 4217 currency code.
 * @returns {string} Formatted currency string, e.g. "$1,234.50".
 */
export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  if (value == null || Number.isNaN(Number(value))) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}
