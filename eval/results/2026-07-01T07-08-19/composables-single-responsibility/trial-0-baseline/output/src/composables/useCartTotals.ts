import { ref, computed } from 'vue'
import type { Discount } from '../types/cart'
import { useCartItems } from './useCartItems'

const TAX_RATE = 0.08
const FREE_SHIPPING_THRESHOLD = 75
const FLAT_SHIPPING_COST = 6.99

const appliedDiscount = ref<Discount | null>(null)

export function useCartTotals() {
  const { items } = useCartItems()

  const subtotal = computed(() =>
    round(items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
  )

  const discountAmount = computed(() => {
    const discount = appliedDiscount.value
    if (!discount) return 0
    const amount =
      discount.type === 'percentage'
        ? subtotal.value * (discount.value / 100)
        : discount.value
    return round(Math.min(amount, subtotal.value))
  })

  const taxableAmount = computed(() => Math.max(subtotal.value - discountAmount.value, 0))

  const tax = computed(() => round(taxableAmount.value * TAX_RATE))

  const shipping = computed(() =>
    items.value.length === 0 || taxableAmount.value >= FREE_SHIPPING_THRESHOLD
      ? 0
      : FLAT_SHIPPING_COST
  )

  const total = computed(() =>
    round(taxableAmount.value + tax.value + shipping.value)
  )

  function applyDiscount(discount: Discount) {
    appliedDiscount.value = discount
  }

  function removeDiscount() {
    appliedDiscount.value = null
  }

  return {
    subtotal,
    discountAmount,
    tax,
    shipping,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
  }
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
