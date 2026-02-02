import { computed, type MaybeRefOrGetter, toValue } from 'vue'

export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function useFormatCurrency(
  value: MaybeRefOrGetter<number>,
  currency = 'USD',
  locale = 'en-US'
) {
  const formatted = computed(() => formatCurrency(toValue(value), currency, locale))
  return { formatted }
}
