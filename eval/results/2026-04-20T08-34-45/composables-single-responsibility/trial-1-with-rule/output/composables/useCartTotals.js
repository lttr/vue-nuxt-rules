import { computed } from 'vue'

export function useCartTotals(items, discountCode = null) {
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discount = computed(() => {
    if (!discountCode?.value) return 0
    const codes = { SAVE10: 0.10, SAVE20: 0.20 }
    return subtotal.value * (codes[discountCode.value] ?? 0)
  })

  const total = computed(() => subtotal.value - discount.value)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  return { subtotal, discount, total, itemCount }
}
