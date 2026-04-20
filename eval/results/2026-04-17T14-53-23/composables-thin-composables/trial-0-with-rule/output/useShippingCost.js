import { computed, toValue } from 'vue'
import { calculateShippingCost } from './shipping.js'

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() =>
    calculateShippingCost(toValue(weightKg), toValue(zone), toValue(orderTotal))
  )
  return { cost }
}
