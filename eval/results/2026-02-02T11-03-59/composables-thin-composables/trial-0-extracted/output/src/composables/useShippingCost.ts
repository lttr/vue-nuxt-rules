import { computed, ref, type Ref } from 'vue'

export type DestinationZone = 'domestic' | 'international'

export function calculateShippingCost(
  weightKg: number,
  zone: DestinationZone,
  orderTotal: number
): number {
  if (orderTotal > 100) {
    return 0
  }

  if (zone === 'domestic') {
    return 5 + 1 * weightKg
  }

  return 15 + 3 * weightKg
}

export function useShippingCost(
  weightKg?: Ref<number>,
  zone?: Ref<DestinationZone>,
  orderTotal?: Ref<number>
) {
  const weight = weightKg ?? ref(0)
  const destination = zone ?? ref<DestinationZone>('domestic')
  const total = orderTotal ?? ref(0)

  const cost = computed(() =>
    calculateShippingCost(weight.value, destination.value, total.value)
  )

  return {
    weight,
    destination,
    total,
    cost,
  }
}
