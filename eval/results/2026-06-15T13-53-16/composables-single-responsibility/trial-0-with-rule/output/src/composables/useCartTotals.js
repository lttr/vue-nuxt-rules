import { computed } from 'vue'
import { useCartState } from './useCartState'

// Responsibility: deriving totals and discounts from cart items (read-only).
export function useCartTotals(options = {}) {
  const { items } = useCartState()
  const { discountRate = 0, freeShippingThreshold = Infinity, shippingCost = 0 } = options

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
  )

  const discount = computed(() => subtotal.value * discountRate)

  const shipping = computed(() =>
    subtotal.value >= freeShippingThreshold ? 0 : shippingCost
  )

  const total = computed(() =>
    Math.max(0, subtotal.value - discount.value) + shipping.value
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  return { subtotal, discount, shipping, total, itemCount }
}
