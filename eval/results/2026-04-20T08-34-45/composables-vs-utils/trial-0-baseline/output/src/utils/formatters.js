/**
 * Formats a number as a USD currency string.
 * formatCurrency(1234.5) → "$1,234.50"
 */
export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  if (value == null || isNaN(Number(value))) return '—'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))
}

/**
 * Formats a date value into a human-readable string.
 * Accepts a Date object, ISO string, or timestamp.
 * formatDate(new Date('2024-03-15')) → "March 15, 2024"
 */
export function formatDate(value, options = {}, locale = 'en-US') {
  if (!value) return '—'
  const date = value instanceof Date ? value : new Date(value)
  if (isNaN(date.getTime())) return 'Invalid date'

  const defaults = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat(locale, { ...defaults, ...options }).format(date)
}
