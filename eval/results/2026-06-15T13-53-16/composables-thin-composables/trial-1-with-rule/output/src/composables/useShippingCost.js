import { computed, toValue } from 'vue'
import { calculateShippingCost } from '../utils/shippingCost.js'

/**
 * Reactive shipping-cost composable. Inputs may be refs, getters, or plain
 * values; the returned `cost` recomputes when any reactive input changes.
 *
 * @param {import('vue').MaybeRefOrGetter<number>} weightKg
 * @param {import('vue').MaybeRefOrGetter<'domestic'|'international'>} zone
 * @param {import('vue').MaybeRefOrGetter<number>} [orderTotal]
 */
export function useShippingCost(weightKg, zone, orderTotal = 0) {
  const cost = computed(() =>
    calculateShippingCost({
      weightKg: toValue(weightKg),
      zone: toValue(zone),
      orderTotal: toValue(orderTotal),
    }),
  )

  return { cost }
}
