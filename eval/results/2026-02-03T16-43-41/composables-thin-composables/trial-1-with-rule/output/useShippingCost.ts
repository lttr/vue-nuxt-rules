import { computed, ref, type Ref, type ComputedRef } from 'vue'

export type DestinationZone = 'domestic' | 'international'

export interface ShippingInput {
  weight: Ref<number>
  zone: Ref<DestinationZone>
  orderTotal: Ref<number>
}

export interface ShippingResult {
  cost: ComputedRef<number>
}

// Pure helper function for shipping calculation
export function calculateShippingCost(
  weight: number,
  zone: DestinationZone,
  orderTotal: number
): number {
  if (orderTotal >= 100) {
    return 0
  }

  if (zone === 'domestic') {
    return 5 + weight * 1
  }

  return 15 + weight * 3
}

// Composable handles reactivity
export function useShippingCost(input: ShippingInput): ShippingResult {
  const cost = computed(() =>
    calculateShippingCost(input.weight.value, input.zone.value, input.orderTotal.value)
  )

  return { cost }
}
