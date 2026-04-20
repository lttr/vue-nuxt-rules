import { computed, unref } from 'vue'

export function useShippingCost(weight, zone, orderTotal) {
  const cost = computed(() => {
    const w = Number(unref(weight)) || 0
    const z = unref(zone)
    const total = Number(unref(orderTotal)) || 0

    if (total > 100) return 0

    if (z === 'international') return 15 + 3 * w
    return 5 + 1 * w
  })

  return { cost }
}
