import { ref, computed } from 'vue'
import type { Discount } from '../types/cart'
import { useCartItems } from './useCartItems'

export function useCartTotals() {
  const { items } = useCartItems()
  const appliedDiscount = ref<Discount | null>(null)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() => {
    const discount = appliedDiscount.value
    if (!discount) return 0
    if (discount.type === 'percent') {
      return subtotal.value * (discount.value / 100)
    }
    return Math.min(discount.value, subtotal.value)
  })

  const taxRate = 0.0

  const taxAmount = computed(() => (subtotal.value - discountAmount.value) * taxRate)

  const total = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value + taxAmount.value)
  )

  function applyDiscount(discount: Discount) {
    appliedDiscount.value = discount
  }

  function removeDiscount() {
    appliedDiscount.value = null
  }

  return {
    subtotal,
    discountAmount,
    taxAmount,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
  }
}
