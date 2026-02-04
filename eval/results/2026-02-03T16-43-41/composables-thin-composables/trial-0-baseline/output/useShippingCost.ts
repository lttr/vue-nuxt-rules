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
  isFreeShipping: Ref<boolean>
}

export function useShippingCost(options: ShippingCostOptions = {}): ShippingCostReturn {
  const weight = ref(typeof options.weight === 'number' ? options.weight : options.weight?.value ?? 0)
  const zone = ref<DestinationZone>(typeof options.zone === 'string' ? options.zone : options.zone?.value ?? 'domestic')
  const orderTotal = ref(typeof options.orderTotal === 'number' ? options.orderTotal : options.orderTotal?.value ?? 0)

  const isFreeShipping = computed(() => orderTotal.value >= 100)

  const shippingCost = computed(() => {
    if (isFreeShipping.value) {
      return 0
    }

    const w = Math.max(0, weight.value)

    if (zone.value === 'domestic') {
      return 5 + 1 * w
    }

    // international
    return 15 + 3 * w
  })

  return {
    weight,
    zone,
    orderTotal,
    shippingCost,
    isFreeShipping,
  }
}
