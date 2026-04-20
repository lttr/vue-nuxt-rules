import { computed, unref } from 'vue'
import { calculateShippingCost } from '../utils/shippingCost.js'

export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() =>
    calculateShippingCost({
      weightKg: unref(weightKg),
      zone: unref(zone),
      orderTotal: unref(orderTotal),
    })
  )

  return { cost }
}
