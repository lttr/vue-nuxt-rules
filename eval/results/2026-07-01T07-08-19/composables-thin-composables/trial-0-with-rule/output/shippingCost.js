const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

export function calculateShippingCost(weightKg, zone, orderTotal) {
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) return 0

  const rate = RATES[zone]
  if (!rate) throw new Error(`Unknown shipping zone: ${zone}`)

  return rate.base + rate.perKg * weightKg
}
