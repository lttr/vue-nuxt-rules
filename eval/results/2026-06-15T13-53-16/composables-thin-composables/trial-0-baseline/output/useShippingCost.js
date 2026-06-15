import { computed, unref } from 'vue'

/**
 * Shipping zones supported by the calculator.
 * @type {{DOMESTIC: 'domestic', INTERNATIONAL: 'international'}}
 */
export const SHIPPING_ZONES = {
  DOMESTIC: 'domestic',
  INTERNATIONAL: 'international',
}

/**
 * Per-zone pricing: a flat base fee plus a per-kilogram rate.
 */
const ZONE_RATES = {
  [SHIPPING_ZONES.DOMESTIC]: { base: 5, perKg: 1 },
  [SHIPPING_ZONES.INTERNATIONAL]: { base: 15, perKg: 3 },
}

/** Orders at or above this total ship free. */
const FREE_SHIPPING_THRESHOLD = 100

/**
 * Calculate shipping cost based on weight, destination zone, and order total.
 *
 * Business rules:
 *  - Domestic:      $5 base + $1 per kg
 *  - International: $15 base + $3 per kg
 *  - Free shipping when the order total is $100 or more
 *
 * Inputs may be plain values, refs, or getters — the returned `cost` is a
 * reactive computed that recalculates when any input changes.
 *
 * @param {import('vue').MaybeRefOrGetter<number>} weight - package weight in kg
 * @param {import('vue').MaybeRefOrGetter<string>} zone - 'domestic' | 'international'
 * @param {import('vue').MaybeRefOrGetter<number>} [orderTotal=0] - order total in dollars
 * @returns {{ cost: import('vue').ComputedRef<number>, isFreeShipping: import('vue').ComputedRef<boolean> }}
 */
export function useShippingCost(weight, zone, orderTotal = 0) {
  const resolve = (input) => (typeof input === 'function' ? input() : unref(input))

  const isFreeShipping = computed(
    () => (Number(resolve(orderTotal)) || 0) >= FREE_SHIPPING_THRESHOLD,
  )

  const cost = computed(() => {
    const total = Number(resolve(orderTotal)) || 0
    if (total >= FREE_SHIPPING_THRESHOLD) return 0

    const rates = ZONE_RATES[resolve(zone)]
    if (!rates) {
      throw new Error(`Unknown shipping zone: ${resolve(zone)}`)
    }

    const kg = Math.max(0, Number(resolve(weight)) || 0)
    return rates.base + rates.perKg * kg
  })

  return { cost, isFreeShipping }
}
