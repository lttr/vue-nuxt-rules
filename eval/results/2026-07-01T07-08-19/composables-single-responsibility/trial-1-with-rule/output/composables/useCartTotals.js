import { computed, unref } from 'vue'

export function useCartTotals(items, discounts = []) {
  const subtotal = computed(() =>
    unref(items).reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountTotal = computed(() =>
    unref(discounts).reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + subtotal.value * (discount.value / 100)
      }
      if (discount.type === 'fixed') {
        return sum + discount.value
      }
      return sum
    }, 0)
  )

  const total = computed(() =>
    Math.max(0, subtotal.value - discountTotal.value)
  )

  return {
    subtotal,
    discountTotal,
    total,
  }
}
