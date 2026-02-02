import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { calculateShippingCost } from './shippingCost';
import { useShippingCost } from './useShippingCost';

describe('calculateShippingCost', () => {
  it('returns $5 + $1/kg for domestic', () => {
    expect(calculateShippingCost(3, 'domestic', 50)).toBe(8);
  });

  it('returns $15 + $3/kg for international', () => {
    expect(calculateShippingCost(4, 'international', 50)).toBe(27);
  });

  it('returns 0 when order total is exactly $100', () => {
    expect(calculateShippingCost(10, 'domestic', 100)).toBe(0);
  });

  it('returns 0 when order total exceeds $100', () => {
    expect(calculateShippingCost(5, 'international', 150)).toBe(0);
  });

  it('handles zero weight domestic', () => {
    expect(calculateShippingCost(0, 'domestic', 10)).toBe(5);
  });

  it('handles zero weight international', () => {
    expect(calculateShippingCost(0, 'international', 10)).toBe(15);
  });
});

describe('useShippingCost', () => {
  it('returns a reactive computed cost', () => {
    const weight = ref(2);
    const zone = ref<'domestic' | 'international'>('domestic');
    const orderTotal = ref(50);

    const { cost } = useShippingCost(weight, zone, orderTotal);
    expect(cost.value).toBe(7);

    zone.value = 'international';
    expect(cost.value).toBe(21);

    orderTotal.value = 100;
    expect(cost.value).toBe(0);
  });
});
