import { computed } from 'vue'

export function useCartTotals(items, discountCode = null) {
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountRules = {
    SAVE10: { type: 'percentage', value: 10 },
    SAVE20: { type: 'percentage', value: 20 },
    FLAT5: { type: 'fixed', value: 5 },
    FLAT15: { type: 'fixed', value: 15 },
  }

  const discount = computed(() => {
    if (!discountCode.value) return 0
    const rule = discountRules[discountCode.value.toUpperCase()]
    if (!rule) return 0
    if (rule.type === 'percentage') {
      return subtotal.value * (rule.value / 100)
    }
    return Math.min(rule.value, subtotal.value)
  })

  const tax = computed(() => (subtotal.value - discount.value) * 0.08)

  const total = computed(() =>
    Math.max(0, subtotal.value - discount.value + tax.value)
  )

  function isValidDiscount(code) {
    return code && code.toUpperCase() in discountRules
  }

  return {
    subtotal,
    discount,
    tax,
    total,
    isValidDiscount,
  }
}
