import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useShippingCost } from './useShippingCost'

describe('useShippingCost', () => {
  describe('domestic zone', () => {
    it('calculates $5 base + $1/kg', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(10),
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal: ref(50),
      })
      expect(shippingCost.value).toBe(15) // 5 + 10*1
    })

    it('handles zero weight', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(0),
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal: ref(20),
      })
      expect(shippingCost.value).toBe(5)
    })
  })

  describe('international zone', () => {
    it('calculates $15 base + $3/kg', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(4),
        zone: ref<'domestic' | 'international'>('international'),
        orderTotal: ref(50),
      })
      expect(shippingCost.value).toBe(27) // 15 + 4*3
    })

    it('handles zero weight', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(0),
        zone: ref<'domestic' | 'international'>('international'),
        orderTotal: ref(10),
      })
      expect(shippingCost.value).toBe(15)
    })
  })

  describe('free shipping over $100', () => {
    it('returns 0 when order total is exactly $100', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(20),
        zone: ref<'domestic' | 'international'>('international'),
        orderTotal: ref(100),
      })
      expect(shippingCost.value).toBe(0)
    })

    it('returns 0 when order total exceeds $100', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(5),
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal: ref(150),
      })
      expect(shippingCost.value).toBe(0)
    })

    it('charges shipping when order total is $99.99', () => {
      const { shippingCost } = useShippingCost({
        weightKg: ref(2),
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal: ref(99.99),
      })
      expect(shippingCost.value).toBe(7) // 5 + 2*1
    })
  })

  describe('reactivity', () => {
    it('recomputes when weight changes', () => {
      const weight = ref(2)
      const { shippingCost } = useShippingCost({
        weightKg: weight,
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal: ref(50),
      })
      expect(shippingCost.value).toBe(7)
      weight.value = 10
      expect(shippingCost.value).toBe(15)
    })

    it('recomputes when zone changes', () => {
      const zone = ref<'domestic' | 'international'>('domestic')
      const { shippingCost } = useShippingCost({
        weightKg: ref(4),
        zone,
        orderTotal: ref(50),
      })
      expect(shippingCost.value).toBe(9) // domestic: 5 + 4
      zone.value = 'international'
      expect(shippingCost.value).toBe(27) // international: 15 + 12
    })

    it('recomputes when order total crosses $100 threshold', () => {
      const orderTotal = ref(50)
      const { shippingCost } = useShippingCost({
        weightKg: ref(5),
        zone: ref<'domestic' | 'international'>('domestic'),
        orderTotal,
      })
      expect(shippingCost.value).toBe(10)
      orderTotal.value = 100
      expect(shippingCost.value).toBe(0)
    })
  })

  describe('plain values (non-ref inputs)', () => {
    it('works with plain numbers and strings', () => {
      const { shippingCost } = useShippingCost({
        weightKg: 3,
        zone: 'international',
        orderTotal: 40,
      })
      expect(shippingCost.value).toBe(24) // 15 + 3*3
    })
  })
})
