import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { useShippingCost } from '../composables/useShippingCost';

describe('useShippingCost', () => {
  describe('domestic zone', () => {
    it('calculates $5 base + $1/kg', () => {
      const { shippingCost } = useShippingCost(ref(10), ref('domestic'), ref(50));
      expect(shippingCost.value).toBe(15); // 5 + 10*1
    });

    it('handles zero weight', () => {
      const { shippingCost } = useShippingCost(ref(0), ref('domestic'), ref(20));
      expect(shippingCost.value).toBe(5);
    });
  });

  describe('international zone', () => {
    it('calculates $15 base + $3/kg', () => {
      const { shippingCost } = useShippingCost(ref(10), ref('international'), ref(50));
      expect(shippingCost.value).toBe(45); // 15 + 10*3
    });

    it('handles zero weight', () => {
      const { shippingCost } = useShippingCost(ref(0), ref('international'), ref(20));
      expect(shippingCost.value).toBe(15);
    });
  });

  describe('free shipping threshold', () => {
    it('returns 0 when order total is exactly $100', () => {
      const { shippingCost } = useShippingCost(ref(10), ref('domestic'), ref(100));
      expect(shippingCost.value).toBe(0);
    });

    it('returns 0 when order total exceeds $100', () => {
      const { shippingCost } = useShippingCost(ref(20), ref('international'), ref(150));
      expect(shippingCost.value).toBe(0);
    });

    it('charges shipping when order total is $99.99', () => {
      const { shippingCost } = useShippingCost(ref(5), ref('domestic'), ref(99.99));
      expect(shippingCost.value).toBe(10); // 5 + 5*1
    });
  });

  describe('reactivity', () => {
    it('recomputes when weight changes', () => {
      const weight = ref(5);
      const { shippingCost } = useShippingCost(weight, ref('domestic'), ref(50));
      expect(shippingCost.value).toBe(10);

      weight.value = 20;
      expect(shippingCost.value).toBe(25);
    });

    it('recomputes when zone changes', () => {
      const zone = ref<'domestic' | 'international'>('domestic');
      const { shippingCost } = useShippingCost(ref(10), zone, ref(50));
      expect(shippingCost.value).toBe(15);

      zone.value = 'international';
      expect(shippingCost.value).toBe(45);
    });

    it('recomputes when order total crosses free threshold', () => {
      const total = ref(50);
      const { shippingCost } = useShippingCost(ref(10), ref('domestic'), total);
      expect(shippingCost.value).toBe(15);

      total.value = 100;
      expect(shippingCost.value).toBe(0);
    });
  });

  describe('plain value inputs', () => {
    it('accepts plain numbers and strings instead of refs', () => {
      const { shippingCost } = useShippingCost(10, 'international', 50);
      expect(shippingCost.value).toBe(45);
    });
  });
});
