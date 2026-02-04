import { computed, ref, type Ref, type ComputedRef, unref, type MaybeRef } from 'vue'

export type DestinationZone = 'domestic' | 'international'

export interface ShippingInput {
  weightKg: MaybeRef<number>
  zone: MaybeRef<DestinationZone>
  orderTotal: MaybeRef<number>
}

export interface ShippingCostResult {
  shippingCost: ComputedRef<number>
}

// Pure helper function for shipping calculation
export function calculateShippingCost(
  weightKg: number,
  zone: DestinationZone,
  orderTotal: number
): number {
  // Free shipping for orders over $100
  if (orderTotal > 100) {
    return 0
  }

  if (zone === 'domestic') {
    // $5 base + $1 per kg
    return 5 + weightKg * 1
  }

  // International: $15 base + $3 per kg
  return 15 + weightKg * 3
}

// Composable handles reactivity only
export function useShippingCost(input: ShippingInput): ShippingCostResult {
  const shippingCost = computed(() =>
    calculateShippingCost(
      unref(input.weightKg),
      unref(input.zone),
      unref(input.orderTotal)
    )
  )

  return {
    shippingCost
  }
}
