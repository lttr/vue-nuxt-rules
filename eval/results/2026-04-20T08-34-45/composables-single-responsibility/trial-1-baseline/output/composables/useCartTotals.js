import { computed } from 'vue'
import { useCart } from './useCart'

export function useCartTotals({ discountCode = null, taxRate = 0.08 } = {}) {
  const { items } = useCart()

  const DISCOUNT_CODES = {
    SAVE10: { type: 'percent', value: 0.1 },
    SAVE20: { type: 'percent', value: 0.2 },
    FLAT5: { type: 'fixed', value: 5 },
  }

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
  )

  const discount = computed(() => {
    const rule = DISCOUNT_CODES[discountCode?.value?.toUpperCase()]
    if (!rule) return 0
    return rule.type === 'percent'
      ? subtotal.value * rule.value
      : Math.min(rule.value, subtotal.value)
  })

  const discountedSubtotal = computed(() => subtotal.value - discount.value)

  const tax = computed(() => discountedSubtotal.value * taxRate)

  const total = computed(() => discountedSubtotal.value + tax.value)

  const isDiscountValid = computed(() =>
    Boolean(DISCOUNT_CODES[discountCode?.value?.toUpperCase()])
  )

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return {
    subtotal,
    discount,
    discountedSubtotal,
    tax,
    total,
    isDiscountValid,
    formatCurrency,
  }
}
