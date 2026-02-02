export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(locale, options)
}
