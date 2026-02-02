import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useShippingCost } from './useShippingCost'

describe('useShippingCost', () => {
  it('calculates domestic shipping: $5 + $1/kg', () => {
    const { shippingCost } = useShippingCost({
      weightKg: ref(10),
      zone: ref('domestic' as const),
      orderTotal: ref(50),
    })
    expect(shippingCost.value).toBe(15) // 5 + 10*1
  })

  it('calculates international shipping: $15 + $3/kg', () => {
    const { shippingCost } = useShippingCost({
      weightKg: ref(10),
      zone: ref('international' as const),
      orderTotal: ref(50),
    })
    expect(shippingCost.value).toBe(45) // 15 + 10*3
  })

  it('returns free shipping when order total >= $100', () => {
    const { shippingCost } = useShippingCost({
      weightKg: ref(10),
      zone: ref('international' as const),
      orderTotal: ref(100),
    })
    expect(shippingCost.value).toBe(0)
  })

  it('returns free shipping when order total exceeds $100', () => {
    const { shippingCost } = useShippingCost({
      weightKg: ref(5),
      zone: ref('domestic' as const),
      orderTotal: ref(200),
    })
    expect(shippingCost.value).toBe(0)
  })

  it('reacts to weight changes', () => {
    const weight = ref(2)
    const { shippingCost } = useShippingCost({
      weightKg: weight,
      zone: ref('domestic' as const),
      orderTotal: ref(20),
    })
    expect(shippingCost.value).toBe(7) // 5 + 2*1
    weight.value = 8
    expect(shippingCost.value).toBe(13) // 5 + 8*1
  })

  it('reacts to zone changes', () => {
    const zone = ref<'domestic' | 'international'>('domestic')
    const { shippingCost } = useShippingCost({
      weightKg: ref(4),
      zone,
      orderTotal: ref(20),
    })
    expect(shippingCost.value).toBe(9) // 5 + 4*1
    zone.value = 'international'
    expect(shippingCost.value).toBe(27) // 15 + 4*3
  })

  it('reacts to order total crossing the free-shipping threshold', () => {
    const orderTotal = ref(50)
    const { shippingCost } = useShippingCost({
      weightKg: ref(5),
      zone: ref('domestic' as const),
      orderTotal,
    })
    expect(shippingCost.value).toBe(10) // 5 + 5*1
    orderTotal.value = 100
    expect(shippingCost.value).toBe(0)
  })

  it('handles zero weight', () => {
    const { shippingCost } = useShippingCost({
      weightKg: ref(0),
      zone: ref('domestic' as const),
      orderTotal: ref(10),
    })
    expect(shippingCost.value).toBe(5) // base fee only
  })

  it('accepts plain values (not refs)', () => {
    const { shippingCost } = useShippingCost({
      weightKg: 3,
      zone: 'international',
      orderTotal: 20,
    })
    expect(shippingCost.value).toBe(24) // 15 + 3*3
  })
})
