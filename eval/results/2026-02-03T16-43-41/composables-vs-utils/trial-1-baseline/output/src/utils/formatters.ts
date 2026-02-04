/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string (e.g., "$1,234.50")
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
  }).format(value);
}

/**
 * Format a date
 * @param date - Date to format (Date object, timestamp, or ISO string)
 * @param options - Intl.DateTimeFormat options or preset name
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | number | string,
  options: Intl.DateTimeFormatOptions | 'short' | 'medium' | 'long' = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  const presets: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' },
  };

  const formatOptions = typeof options === 'string' ? presets[options] : options;

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
}
