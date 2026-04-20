import { computed } from 'vue'

export function useCartTotals(items, discountCode = null) {
  const DISCOUNTS = {
    SAVE10: 0.10,
    SAVE20: 0.20,
  }

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountRate = computed(() =>
    discountCode?.value ? (DISCOUNTS[discountCode.value] ?? 0) : 0
  )

  const discountAmount = computed(() =>
    subtotal.value * discountRate.value
  )

  const total = computed(() => subtotal.value - discountAmount.value)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  return { subtotal, discountAmount, total, itemCount }
}
