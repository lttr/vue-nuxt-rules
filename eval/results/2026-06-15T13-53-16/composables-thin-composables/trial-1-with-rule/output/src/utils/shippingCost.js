// Pure shipping-cost calculation. No Vue / reactivity here — easy to unit test.

export const SHIPPING_RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

export const FREE_SHIPPING_THRESHOLD = 100

/**
 * Calculate shipping cost.
 *
 * @param {Object} params
 * @param {number} params.weightKg     Package weight in kilograms.
 * @param {'domestic'|'international'} params.zone  Destination zone.
 * @param {number} [params.orderTotal=0]  Order total; >= $100 ships free.
 * @returns {number} Shipping cost in dollars.
 */
export function calculateShippingCost({ weightKg, zone, orderTotal = 0 }) {
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) return 0

  const rate = SHIPPING_RATES[zone]
  if (!rate) throw new Error(`Unknown shipping zone: ${zone}`)

  const weight = Math.max(0, Number(weightKg) || 0)
  return rate.base + rate.perKg * weight
}
