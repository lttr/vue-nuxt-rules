import { computed, unref } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() => {
    const w = Number(unref(weightKg))
    const z = unref(zone)
    const total = Number(unref(orderTotal))

    if (!Number.isFinite(w) || w < 0) {
      throw new Error('weightKg must be a non-negative number')
    }
    const rate = RATES[z]
    if (!rate) {
      throw new Error(`zone must be one of: ${Object.keys(RATES).join(', ')}`)
    }

    if (Number.isFinite(total) && total >= FREE_SHIPPING_THRESHOLD) {
      return 0
    }

    return rate.base + rate.perKg * w
  })

  return { cost }
}
