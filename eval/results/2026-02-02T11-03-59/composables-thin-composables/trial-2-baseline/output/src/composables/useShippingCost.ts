import { computed, ref, type Ref, unref, type MaybeRef } from 'vue';

type DestinationZone = 'domestic' | 'international';

export function useShippingCost(
  weightKg: MaybeRef<number>,
  zone: MaybeRef<DestinationZone>,
  orderTotal: MaybeRef<number>
) {
  const shippingCost = computed(() => {
    const w = unref(weightKg);
    const z = unref(zone);
    const total = unref(orderTotal);

    if (total >= 100) {
      return 0;
    }

    if (z === 'domestic') {
      return 5 + 1 * w;
    }

    return 15 + 3 * w;
  });

  return { shippingCost };
}
