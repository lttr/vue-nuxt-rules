import { computed } from 'vue'
import { useCartItems } from './useCartItems'

export function useCartTotals(discountRules = []) {
  const { items } = useCartItems()

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const discount = computed(() => {
    let total = 0
    for (const rule of discountRules) {
      total += rule(items.value, subtotal.value)
    }
    return total
  })

  const total = computed(() => Math.max(0, subtotal.value - discount.value))

  return {
    subtotal,
    itemCount,
    discount,
    total,
  }
}
