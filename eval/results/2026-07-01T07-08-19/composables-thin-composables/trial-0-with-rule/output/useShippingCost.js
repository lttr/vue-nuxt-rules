import { computed, unref } from 'vue'
import { calculateShippingCost } from './shippingCost.js'

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() =>
    calculateShippingCost(unref(weightKg), unref(zone), unref(orderTotal))
  )

  return { cost }
}
