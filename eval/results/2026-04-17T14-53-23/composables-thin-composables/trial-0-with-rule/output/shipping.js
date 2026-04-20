export function calculateShippingCost(weightKg, zone, orderTotal) {
  if (orderTotal >= 100) return 0
  if (zone === 'domestic') return 5 + 1 * weightKg
  if (zone === 'international') return 15 + 3 * weightKg
  throw new Error(`Unknown zone: ${zone}`)
}
