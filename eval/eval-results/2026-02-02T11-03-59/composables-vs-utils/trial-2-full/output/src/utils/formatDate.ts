export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat(locale, options ?? defaults).format(date)
}
