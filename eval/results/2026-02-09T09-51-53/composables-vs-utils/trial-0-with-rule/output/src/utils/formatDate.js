/**
 * Format a Date (or date-like value) into a readable string.
 * @param {Date|string|number} value
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [locale='en-US']
 * @returns {string}
 */
export function formatDate(value, options = { year: 'numeric', month: 'long', day: 'numeric' }, locale = 'en-US') {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}
