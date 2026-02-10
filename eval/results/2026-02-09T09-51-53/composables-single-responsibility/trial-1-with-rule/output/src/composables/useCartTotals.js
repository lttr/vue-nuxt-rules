import { computed } from 'vue'

/**
 * Composable for calculating cart totals and applying discounts.
 *
 * @param {import('vue').Ref<Array>} items - reactive array of cart items
 *   Each item should have: { id, price, quantity }
 * @param {import('vue').Ref<Array>} discounts - reactive array of discount rules
 *   Each discount: { code, type: 'percentage' | 'fixed', value }
 */
export function useCartTotals(items, discounts) {
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() => {
    if (!discounts?.value?.length) return 0
    return discounts.value.reduce((total, discount) => {
      if (discount.type === 'percentage') {
        return total + subtotal.value * (discount.value / 100)
      }
      if (discount.type === 'fixed') {
        return total + discount.value
      }
      return total
    }, 0)
  })

  const total = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value)
  )

  return {
    subtotal,
    discountAmount,
    total,
  }
}
