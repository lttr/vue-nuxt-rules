import { computed } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

export function useShippingCost(weight, zone, orderTotal) {
  const shippingCost = computed(() => {
    if (orderTotal.value >= 100) return 0

    const rate = RATES[zone.value]
    if (!rate) throw new Error(`Unknown zone: ${zone.value}`)

    return rate.base + rate.perKg * weight.value
  })

  return { shippingCost }
}
