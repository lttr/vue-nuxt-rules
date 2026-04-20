import { computed, unref } from 'vue'
import { calculateShippingCost } from './shipping.js'

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() =>
    calculateShippingCost(unref(weightKg), unref(zone), unref(orderTotal))
  )
  return { cost }
}
