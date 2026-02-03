export type DestinationZone = 'domestic' | 'international';

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
