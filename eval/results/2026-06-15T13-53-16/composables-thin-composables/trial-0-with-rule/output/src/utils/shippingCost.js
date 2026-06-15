/**
 * Pure shipping-cost calculation. No reactivity — just business rules.
 *
 * Rules:
 *   - domestic:      $5 base  + $1/kg
 *   - international:  $15 base + $3/kg
 *   - free shipping when the order total exceeds $100
 */

export const SHIPPING_RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

export const FREE_SHIPPING_THRESHOLD = 100

/**
 * @param {Object} params
 * @param {number} params.weightKg     Package weight in kilograms (>= 0).
 * @param {'domestic'|'international'} params.zone  Destination zone.
 * @param {number} [params.orderTotal=0]  Order subtotal in dollars.
 * @returns {number} Shipping cost in dollars.
 */
export function calculateShippingCost({ weightKg, zone, orderTotal = 0 }) {
  const rate = SHIPPING_RATES[zone]
  if (!rate) {
    throw new Error(`Unknown shipping zone: ${zone}`)
  }
  if (weightKg < 0) {
    throw new Error(`Weight must be non-negative, got: ${weightKg}`)
  }

  if (orderTotal > FREE_SHIPPING_THRESHOLD) {
    return 0
  }

  return rate.base + rate.perKg * weightKg
}
