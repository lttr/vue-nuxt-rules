import { computed, unref } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

export function useShippingCost(weight, zone, orderTotal) {
  const cost = computed(() => {
    const w = Number(unref(weight)) || 0
    const z = unref(zone)
    const total = Number(unref(orderTotal)) || 0

    if (total >= FREE_SHIPPING_THRESHOLD) return 0

    const rate = RATES[z]
    if (!rate) throw new Error(`Unknown shipping zone: ${z}`)

    return rate.base + rate.perKg * w
  })

  return { cost }
}
