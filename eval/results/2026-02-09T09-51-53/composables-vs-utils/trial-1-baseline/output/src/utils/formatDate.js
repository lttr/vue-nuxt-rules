/**
 * Formats a Date (or date-like value) into a human-readable string.
 *
 * @param {Date|string|number} value - The date to format.
 * @param {object} [options] - Intl.DateTimeFormat options override.
 * @param {string} [locale='en-US'] - BCP 47 locale string.
 * @returns {string} Formatted date string, e.g. "February 9, 2026".
 */
export function formatDate(
  value,
  options = { year: 'numeric', month: 'long', day: 'numeric' },
  locale = 'en-US',
) {
  if (value == null) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
