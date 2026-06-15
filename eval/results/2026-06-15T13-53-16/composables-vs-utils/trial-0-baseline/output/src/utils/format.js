// Formatting utilities for currency and dates.

/**
 * Format a numeric value as currency.
 *
 * @param {number} value - The amount to format, e.g. 1234.5
 * @param {object} [options]
 * @param {string} [options.currency='USD'] - ISO 4217 currency code.
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @returns {string} The formatted currency string, e.g. "$1,234.50".
 *
 * @example
 * formatCurrency(1234.5)                          // "$1,234.50"
 * formatCurrency(1234.5, { currency: 'EUR', locale: 'de-DE' }) // "1.234,50 €"
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

/**
 * Format a date value into a human-readable string.
 *
 * @param {Date|string|number} value - A Date, ISO string, or timestamp.
 * @param {object} [options]
 * @param {string} [options.locale='en-US'] - BCP 47 locale tag.
 * @param {Intl.DateTimeFormatOptions} [options.dateStyle] - Intl format options.
 *   Defaults to a medium date (e.g. "Jun 15, 2026").
 * @returns {string} The formatted date string, or '' for invalid input.
 *
 * @example
 * formatDate('2026-06-15')                       // "Jun 15, 2026"
 * formatDate(new Date(), { dateStyle: 'full' })  // "Monday, June 15, 2026"
 */
export function formatDate(value, { locale = 'en-US', dateStyle = 'medium', ...rest } = {}) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(locale, { dateStyle, ...rest }).format(date)
}
