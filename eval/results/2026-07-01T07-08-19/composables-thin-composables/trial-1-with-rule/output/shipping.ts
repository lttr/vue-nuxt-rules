const RATES = {
  domestic: { base: 5, perKg: 1 },
  international: { base: 15, perKg: 3 },
}

const FREE_SHIPPING_THRESHOLD = 100

export type ShippingZone = keyof typeof RATES

export function calculateShippingCost(weightKg, zone, orderTotal) {
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) return 0

  const { base, perKg } = RATES[zone]
  return base + perKg * weightKg
}
