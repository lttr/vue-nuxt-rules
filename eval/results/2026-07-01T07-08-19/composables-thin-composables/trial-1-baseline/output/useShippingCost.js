import { computed, unref } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() => {
    const total = unref(orderTotal) ?? 0
    if (total >= FREE_SHIPPING_THRESHOLD) return 0

    const rate = RATES[unref(zone)]
    if (!rate) throw new Error(`Unknown shipping zone: ${unref(zone)}`)

    const weight = unref(weightKg) ?? 0
    return rate.base + rate.perKg * weight
  })

  return { cost }
}
