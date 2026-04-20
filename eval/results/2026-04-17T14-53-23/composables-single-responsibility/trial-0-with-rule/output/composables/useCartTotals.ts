import { computed, ref, type Ref } from 'vue'
import { useCartState } from './useCartState'

export interface Discount {
  code: string
  type: 'percent' | 'fixed'
  value: number
}

export function useCartTotals(discount: Ref<Discount | null> = ref(null)) {
  const { items } = useCartState()

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const discountAmount = computed(() => {
    const d = discount.value
    if (!d) return 0
    if (d.type === 'percent') return subtotal.value * (d.value / 100)
    return Math.min(d.value, subtotal.value)
  })

  const total = computed(() => subtotal.value - discountAmount.value)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  return { subtotal, discountAmount, total, itemCount }
}
