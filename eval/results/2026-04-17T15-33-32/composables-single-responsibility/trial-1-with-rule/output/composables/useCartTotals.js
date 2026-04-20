import { computed } from 'vue'
import { useCartState } from './useCartState'

export function useCartTotals(discountCode = null) {
  const { items } = useCartState()

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  )

  const discount = computed(() => {
    const code = typeof discountCode === 'function' ? discountCode() : discountCode
    if (!code) return 0
    if (code === 'SAVE10') return subtotal.value * 0.1
    if (code === 'SAVE20') return subtotal.value * 0.2
    return 0
  })

  const tax = computed(() => (subtotal.value - discount.value) * 0.08)

  const total = computed(() => subtotal.value - discount.value + tax.value)

  return { subtotal, discount, tax, total }
}
