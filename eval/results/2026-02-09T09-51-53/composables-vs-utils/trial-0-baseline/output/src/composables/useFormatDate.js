/**
 * Formats a Date (or date-parseable value) into a readable string.
 *
 * @param {Date|string|number} value - The date to format.
 * @param {Intl.DateTimeFormatOptions} [options] - Intl formatting options.
 * @param {string} [locale='en-US'] - BCP 47 locale tag.
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
