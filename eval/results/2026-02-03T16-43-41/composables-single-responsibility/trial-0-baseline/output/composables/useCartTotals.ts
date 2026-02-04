import { computed, ref, type Ref } from 'vue'
import type { CartItem } from './useCart'

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
}

export interface CartTotals {
  subtotal: number
  discountAmount: number
  tax: number
  shipping: number
  total: number
}

const TAX_RATE = 0.08
const FREE_SHIPPING_THRESHOLD = 50

export function useCartTotals(items: Ref<readonly CartItem[]>) {
  const appliedDiscount = ref<Discount | null>(null)
  const shippingCost = ref(5.99)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() => {
    if (!appliedDiscount.value) return 0

    const discount = appliedDiscount.value
    if (discount.minPurchase && subtotal.value < discount.minPurchase) {
      return 0
    }

    if (discount.type === 'percentage') {
      return subtotal.value * (discount.value / 100)
    }
    return Math.min(discount.value, subtotal.value)
  })

  const subtotalAfterDiscount = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value)
  )

  const tax = computed(() => subtotalAfterDiscount.value * TAX_RATE)

  const shipping = computed(() => {
    if (items.value.length === 0) return 0
    return subtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : shippingCost.value
  })

  const total = computed(() => subtotalAfterDiscount.value + tax.value + shipping.value)

  const qualifiesForFreeShipping = computed(() =>
    subtotal.value >= FREE_SHIPPING_THRESHOLD
  )

  const amountUntilFreeShipping = computed(() =>
    Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal.value)
  )

  function applyDiscount(discount: Discount): boolean {
    if (discount.minPurchase && subtotal.value < discount.minPurchase) {
      return false
    }
    appliedDiscount.value = discount
    return true
  }

  function removeDiscount() {
    appliedDiscount.value = null
  }

  function setShippingCost(cost: number) {
    shippingCost.value = cost
  }

  const totals = computed<CartTotals>(() => ({
    subtotal: subtotal.value,
    discountAmount: discountAmount.value,
    tax: tax.value,
    shipping: shipping.value,
    total: total.value,
  }))

  return {
    subtotal,
    discountAmount,
    tax,
    shipping,
    total,
    totals,
    appliedDiscount,
    qualifiesForFreeShipping,
    amountUntilFreeShipping,
    applyDiscount,
    removeDiscount,
    setShippingCost,
  }
}
