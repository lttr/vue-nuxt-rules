import { computed, unref } from 'vue'

const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

/**
 * Calculate shipping cost based on weight and destination zone.
 *
 * Business rules:
 *  - domestic:      $5 base + $1/kg
 *  - international:  $15 base + $3/kg
 *  - free shipping when the order total is over $100
 *
 * Inputs may be plain values, refs, or getters — the returned `cost`
 * is reactive and recomputes when any input changes.
 *
 * @param {number|import('vue').Ref<number>} weight - weight in kg
 * @param {string|import('vue').Ref<string>} zone - 'domestic' | 'international'
 * @param {number|import('vue').Ref<number>} orderTotal - order total in dollars
 */
export function useShippingCost(weight, zone, orderTotal = 0) {
  const cost = computed(() => calculateShippingCost(unref(weight), unref(zone), unref(orderTotal)))

  return { cost }
}

/**
 * Pure shipping cost calculation. Exported for direct/non-reactive use and testing.
 *
 * @param {number} weight - weight in kg
 * @param {string} zone - 'domestic' | 'international'
 * @param {number} orderTotal - order total in dollars
 * @returns {number} shipping cost in dollars
 */
export function calculateShippingCost(weight, zone, orderTotal = 0) {
  const rate = RATES[zone]
  if (!rate) {
    throw new Error(`Unknown shipping zone: "${zone}". Expected "domestic" or "international".`)
  }

  if (typeof weight !== 'number' || Number.isNaN(weight) || weight < 0) {
    throw new Error(`Invalid weight: "${weight}". Expected a non-negative number.`)
  }

  if (orderTotal > FREE_SHIPPING_THRESHOLD) {
    return 0
  }

  return rate.base + rate.perKg * weight
}
