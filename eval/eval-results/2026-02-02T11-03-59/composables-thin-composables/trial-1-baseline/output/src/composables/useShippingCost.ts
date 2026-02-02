import { computed, ref, type Ref, type MaybeRefOrGetter, toValue } from 'vue'

type DestinationZone = 'domestic' | 'international'

interface UseShippingCostOptions {
  weightKg: MaybeRefOrGetter<number>
  zone: MaybeRefOrGetter<DestinationZone>
  orderTotal: MaybeRefOrGetter<number>
}

export function useShippingCost(options: UseShippingCostOptions) {
  const weightKg = options.weightKg
  const zone = options.zone
  const orderTotal = options.orderTotal

  const shippingCost = computed(() => {
    const total = toValue(orderTotal)
    if (total >= 100) return 0

    const weight = toValue(weightKg)
    const dest = toValue(zone)

    if (dest === 'international') {
      return 15 + 3 * weight
    }
    return 5 + 1 * weight
  })

  return { shippingCost }
}
