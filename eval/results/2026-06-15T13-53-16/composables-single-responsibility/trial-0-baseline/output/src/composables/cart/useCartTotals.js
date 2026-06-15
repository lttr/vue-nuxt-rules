import { computed, unref } from 'vue'

/**
 * Rounds to 2 decimal places, avoiding the usual floating-point cents drift
 * (e.g. 0.1 + 0.2). Money is kept as a Number here; for high-stakes billing
 * consider an integer-cents or decimal library instead.
 */
function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Derives monetary totals from the cart items, applying discounts and tax.
 *
 * All inputs may be refs or plain values — they're unwrapped on read, so the
 * computed outputs stay reactive when you pass `items` from `useCartItems`.
 *
 * @param {import('vue').Ref<Array>|Array} items - cart line items
 * @param {Object} [options]
 * @param {import('vue').Ref<number>|number} [options.taxRate=0] - e.g. 0.2 for 20%
 * @param {import('vue').Ref<Array>|Array} [options.discounts=[]] - discount rules
 *
 * A discount rule is one of:
 *   { type: 'percent', value: 0.1, code?: string }      // 10% off subtotal
 *   { type: 'fixed', value: 5, code?: string }           // $5 off
 *   { type: 'fn', apply: (subtotal, items) => number }   // custom, returns amount off
 */
export function useCartTotals(items, options = {}) {
  const { taxRate = 0, discounts = [] } = options

  const subtotal = computed(() => {
    const list = unref(items) ?? []
    return roundMoney(
      list.reduce((sum, item) => sum + item.price * item.quantity, 0),
    )
  })

  /** Total amount removed by discounts, capped so the cart never goes negative. */
  const discountTotal = computed(() => {
    const rules = unref(discounts) ?? []
    const base = subtotal.value
    let total = 0
    for (const rule of rules) {
      total += discountAmount(rule, base, unref(items) ?? [])
    }
    return roundMoney(Math.min(total, base))
  })

  /** Subtotal after discounts but before tax. */
  const discountedSubtotal = computed(() =>
    roundMoney(subtotal.value - discountTotal.value),
  )

  const tax = computed(() =>
    roundMoney(discountedSubtotal.value * (unref(taxRate) || 0)),
  )

  /** Final amount payable. */
  const total = computed(() => roundMoney(discountedSubtotal.value + tax.value))

  return {
    subtotal,
    discountTotal,
    discountedSubtotal,
    tax,
    total,
  }
}

/** Resolve a single discount rule to a dollar amount off the subtotal. */
function discountAmount(rule, subtotal, items) {
  if (!rule) return 0
  switch (rule.type) {
    case 'percent':
      return subtotal * (rule.value || 0)
    case 'fixed':
      return rule.value || 0
    case 'fn':
      return typeof rule.apply === 'function' ? rule.apply(subtotal, items) || 0 : 0
    default:
      return 0
  }
}
