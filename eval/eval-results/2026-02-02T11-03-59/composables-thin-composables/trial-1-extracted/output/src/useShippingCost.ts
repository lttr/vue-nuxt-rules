import { computed, ref, type Ref } from 'vue';
import { calculateShippingCost, type DestinationZone } from './shippingCost';

export function useShippingCost(
  weightKg: Ref<number>,
  zone: Ref<DestinationZone>,
  orderTotal: Ref<number>,
) {
  const cost = computed(() =>
    calculateShippingCost(weightKg.value, zone.value, orderTotal.value),
  );

  return { cost };
}
