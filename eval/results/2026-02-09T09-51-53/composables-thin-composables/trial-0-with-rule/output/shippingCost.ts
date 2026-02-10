export type DestinationZone = 'domestic' | 'international';

/**
 * Pure helper: calculates shipping cost from raw values.
 * - Domestic: $5 + $1/kg
 * - International: $15 + $3/kg
 * - Free when orderTotal >= $100
 */
export function calculateShippingCost(
  weightKg: number,
  zone: DestinationZone,
  orderTotal: number,
): number {
  if (orderTotal >= 100) {
    return 0;
  }

  if (zone === 'domestic') {
    return 5 + 1 * weightKg;
  }

  return 15 + 3 * weightKg;
}
