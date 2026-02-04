/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a date
 * @param date - Date to format (Date object, timestamp, or ISO string)
 * @param options - Intl.DateTimeFormat options
 * @param locale - Locale for formatting (default: 'en-US')
 */
export function formatDate(
  date: Date | number | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string {
  const dateObj = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}
