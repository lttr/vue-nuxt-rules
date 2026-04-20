import { computed } from 'vue';
import { calculateShippingCost } from './shippingCost.js';

export function useShippingCost(weightKg, zone, orderTotal) {
  const shippingCost = computed(() =>
    calculateShippingCost(weightKg.value, zone.value, orderTotal.value)
  );

  return { shippingCost };
}
