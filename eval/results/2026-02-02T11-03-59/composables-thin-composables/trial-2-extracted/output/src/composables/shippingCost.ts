import { computed, ref, type Ref, unref, type MaybeRef } from 'vue'

export type DestinationZone = 'domestic' | 'international'

export function calculateShippingCost(
  weightKg: number,
  zone: DestinationZone,
  orderTotal: number
): number {
  if (orderTotal >= 100) {
    return 0
  }

  if (zone === 'international') {
    return 15 + 3 * weightKg
  }

  return 5 + 1 * weightKg
}

export function useShippingCost(
  weightKg?: MaybeRef<number>,
  zone?: MaybeRef<DestinationZone>,
  orderTotal?: MaybeRef<number>
) {
  const weight = ref(unref(weightKg) ?? 0) as Ref<number>
  const destination = ref(unref(zone) ?? 'domestic') as Ref<DestinationZone>
  const total = ref(unref(orderTotal) ?? 0) as Ref<number>

  const cost = computed(() =>
    calculateShippingCost(weight.value, destination.value, total.value)
  )

  return { weight, destination, total, cost }
}
