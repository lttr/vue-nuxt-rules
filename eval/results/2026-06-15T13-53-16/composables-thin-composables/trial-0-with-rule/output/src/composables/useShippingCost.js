import { computed, toValue } from 'vue'
import { calculateShippingCost } from '../utils/shippingCost.js'

/**
 * Reactive wrapper around `calculateShippingCost`.
 *
 * Accepts plain values, refs, or getters for each input (via `toValue`),
 * and returns a computed shipping cost. All business logic lives in the
 * pure helper — this composable only wires up reactivity.
 *
 * @param {import('vue').MaybeRefOrGetter<number>} weightKg
 * @param {import('vue').MaybeRefOrGetter<'domestic'|'international'>} zone
 * @param {import('vue').MaybeRefOrGetter<number>} [orderTotal]
 * @returns {{ cost: import('vue').ComputedRef<number> }}
 */
export function useShippingCost(weightKg, zone, orderTotal) {
  const cost = computed(() =>
    calculateShippingCost({
      weightKg: toValue(weightKg),
      zone: toValue(zone),
      orderTotal: toValue(orderTotal) ?? 0,
    })
  )

  return { cost }
}
