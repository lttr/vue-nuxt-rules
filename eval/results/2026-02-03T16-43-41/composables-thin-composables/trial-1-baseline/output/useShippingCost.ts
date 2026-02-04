import { computed, ref, type Ref } from 'vue'

type DestinationZone = 'domestic' | 'international'

interface ShippingCostOptions {
  weight?: Ref<number> | number
  zone?: Ref<DestinationZone> | DestinationZone
  orderTotal?: Ref<number> | number
}

interface ShippingCostReturn {
  weight: Ref<number>
  zone: Ref<DestinationZone>
  orderTotal: Ref<number>
  shippingCost: Ref<number>
}

export function useShippingCost(options: ShippingCostOptions = {}): ShippingCostReturn {
  const weight = ref(typeof options.weight === 'number' ? options.weight : options.weight?.value ?? 0)
  const zone = ref<DestinationZone>(typeof options.zone === 'string' ? options.zone : options.zone?.value ?? 'domestic')
  const orderTotal = ref(typeof options.orderTotal === 'number' ? options.orderTotal : options.orderTotal?.value ?? 0)

  const shippingCost = computed(() => {
    // Free shipping for orders over $100
    if (orderTotal.value > 100) {
      return 0
    }

    const kg = Math.max(0, weight.value)

    if (zone.value === 'domestic') {
      // Domestic: $5 base + $1/kg
      return 5 + kg * 1
    } else {
      // International: $15 base + $3/kg
      return 15 + kg * 3
    }
  })

  return {
    weight,
    zone,
    orderTotal,
    shippingCost,
  }
}
