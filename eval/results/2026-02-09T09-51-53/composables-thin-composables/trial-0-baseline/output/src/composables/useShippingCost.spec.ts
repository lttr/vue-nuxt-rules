import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { useShippingCost, type DestinationZone } from './useShippingCost'

describe('useShippingCost', () => {
  // --- Domestic zone ---

  it('calculates domestic base cost with zero weight', () => {
    const weight = ref(0)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(50)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(5)
  })

  it('calculates domestic cost: $5 + $1/kg', () => {
    const weight = ref(10)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(50)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(15) // 5 + 10*1
  })

  // --- International zone ---

  it('calculates international base cost with zero weight', () => {
    const weight = ref(0)
    const zone = ref<DestinationZone>('international')
    const orderTotal = ref(50)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(15)
  })

  it('calculates international cost: $15 + $3/kg', () => {
    const weight = ref(10)
    const zone = ref<DestinationZone>('international')
    const orderTotal = ref(50)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(45) // 15 + 10*3
  })

  // --- Free shipping threshold ---

  it('returns 0 when order total is exactly $100 (domestic)', () => {
    const weight = ref(5)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(100)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(0)
  })

  it('returns 0 when order total exceeds $100 (international)', () => {
    const weight = ref(20)
    const zone = ref<DestinationZone>('international')
    const orderTotal = ref(150)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(0)
  })

  it('charges shipping when order total is just under $100', () => {
    const weight = ref(2)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(99.99)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(7) // 5 + 2*1
  })

  // --- Reactivity ---

  it('reacts to weight changes', () => {
    const weight = ref(1)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(20)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(6) // 5 + 1

    weight.value = 8
    expect(shippingCost.value).toBe(13) // 5 + 8
  })

  it('reacts to zone changes', () => {
    const weight = ref(5)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(20)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(10) // 5 + 5*1

    zone.value = 'international'
    expect(shippingCost.value).toBe(30) // 15 + 5*3
  })

  it('reacts to order total crossing the free-shipping threshold', () => {
    const weight = ref(5)
    const zone = ref<DestinationZone>('international')
    const orderTotal = ref(80)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(30) // 15 + 5*3

    orderTotal.value = 100
    expect(shippingCost.value).toBe(0)
  })

  // --- Edge: negative weight clamped to 0 ---

  it('treats negative weight as zero', () => {
    const weight = ref(-3)
    const zone = ref<DestinationZone>('domestic')
    const orderTotal = ref(10)

    const { shippingCost } = useShippingCost(weight, zone, orderTotal)
    expect(shippingCost.value).toBe(5) // base only
  })
})
