import { ref, computed, readonly, unref } from 'vue'
import { useCart } from './useCart'

/** Round to 2 decimal places, avoiding float drift (e.g. 1.005 -> 1.01). */
function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Reactive pricing for the cart: subtotal, discounts, tax and grand total.
 *
 * Discounts are described as plain objects so they can come from props,
 * an API, or a config file:
 *   { type: 'percent', value: 10 }   // 10% off the subtotal
 *   { type: 'fixed',   value: 5 }    // $5 off the subtotal
 *
 * @param {object} [options]
 * @param {number} [options.taxRate=0] - Tax rate applied to the discounted subtotal (e.g. 0.08).
 */
export function useCartTotals(options = {}) {
  const { taxRate = 0 } = options
  const { items } = useCart()

  /** Active discounts. Ref so callers can apply/clear coupons reactively. */
  const discounts = ref([])

  const subtotal = computed(() =>
    round(items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
  )

  /** Total monetary value of all discounts, capped at the subtotal. */
  const discountTotal = computed(() => {
    const raw = discounts.value.reduce((sum, discount) => {
      if (discount.type === 'percent') {
        return sum + subtotal.value * (discount.value / 100)
      }
      if (discount.type === 'fixed') {
        return sum + discount.value
      }
      return sum
    }, 0)
    return round(Math.min(raw, subtotal.value))
  })

  const discountedSubtotal = computed(() =>
    round(subtotal.value - discountTotal.value)
  )

  const tax = computed(() => round(discountedSubtotal.value * unref(taxRate)))

  const total = computed(() => round(discountedSubtotal.value + tax.value))

  /**
   * Add a discount/coupon.
   * @param {{ type: 'percent'|'fixed', value: number, code?: string }} discount
   */
  function applyDiscount(discount) {
    if (!discount || !['percent', 'fixed'].includes(discount.type)) {
      throw new Error("discount.type must be 'percent' or 'fixed'")
    }
    discounts.value.push(discount)
  }

  /** Remove a previously applied discount by its code, or clear all. */
  function removeDiscount(code) {
    if (code == null) {
      discounts.value = []
      return
    }
    discounts.value = discounts.value.filter((d) => d.code !== code)
  }

  return {
    discounts: readonly(discounts),
    subtotal,
    discountTotal,
    discountedSubtotal,
    tax,
    total,
    applyDiscount,
    removeDiscount,
  }
}
