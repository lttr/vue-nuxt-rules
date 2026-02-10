import { ref, computed, type Ref } from 'vue'

export type DestinationZone = 'domestic' | 'international'

export function useShippingCost(
  weight: Ref<number>,
  zone: Ref<DestinationZone>,
  orderTotal: Ref<number>
) {
  const shippingCost = computed<number>(() => {
    if (orderTotal.value >= 100) {
      return 0
    }

    const w = Math.max(0, weight.value)

    if (zone.value === 'international') {
      return 15 + 3 * w
    }

    return 5 + 1 * w
  })

  return { shippingCost }
}
