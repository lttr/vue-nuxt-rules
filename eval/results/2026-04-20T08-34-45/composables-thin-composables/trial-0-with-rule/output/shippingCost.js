import { computed } from 'vue'

export function calculateShippingCost(weightKg, zone) {
  if (zone === 'domestic') return 5 + weightKg * 1
  if (zone === 'international') return 15 + weightKg * 3
  throw new Error(`Unknown zone: ${zone}`)
}

export function applyFreeShipping(cost, orderTotal) {
  return orderTotal >= 100 ? 0 : cost
}

export function useShippingCost(weightKg, zone, orderTotal) {
  const shippingCost = computed(() => {
    const cost = calculateShippingCost(weightKg.value, zone.value)
    return applyFreeShipping(cost, orderTotal.value)
  })

  return { shippingCost }
}
