import { computed } from 'vue'
import { useCartState } from './useCartState'

/**
 * Derive totals and discounts from the cart items.
 *
 * Single responsibility: pure, read-only computation. No mutation,
 * no I/O. Accepts an optional discount strategy so pricing rules stay
 * injectable and testable.
 */
export function useCartTotals(options = {}) {
  const { items } = useCartState()

  // discount(subtotal, items) => amount to subtract. Default: no discount.
  const discountFn = options.discount ?? (() => 0)
  const taxRate = options.taxRate ?? 0

  const itemCount = computed(() =>
    items.reduce((sum, i) => sum + i.quantity, 0),
  )

  const subtotal = computed(() =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  )

  const discount = computed(() => {
    const amount = discountFn(subtotal.value, items)
    // never discount below zero
    return Math.min(Math.max(amount, 0), subtotal.value)
  })

  const taxableAmount = computed(() => subtotal.value - discount.value)

  const tax = computed(() => taxableAmount.value * taxRate)

  const total = computed(() => taxableAmount.value + tax.value)

  return {
    itemCount,
    subtotal,
    discount,
    tax,
    total,
  }
}
