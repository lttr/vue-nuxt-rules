export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(locale, options)
}
