import { computed, type MaybeRefOrGetter, toValue } from 'vue'

export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US'
): string {
  const d = date instanceof Date ? date : new Date(date)
  const defaults: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat(locale, options ?? defaults).format(d)
}

export function useFormatDate(
  date: MaybeRefOrGetter<Date | string | number>,
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US'
) {
  const formatted = computed(() => formatDate(toValue(date), options, locale))
  return { formatted }
}
