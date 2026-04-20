import { ref, computed } from 'vue'
import { useCart } from './useCart.js'

const TAX_RATE = 0.08
const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 5.99

export function useCartTotals() {
  const { items } = useCart()
  const discountCode = ref(null)
  const discountPercent = ref(0)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() =>
    subtotal.value * (discountPercent.value / 100)
  )

  const subtotalAfterDiscount = computed(() =>
    subtotal.value - discountAmount.value
  )

  const shipping = computed(() =>
    subtotalAfterDiscount.value >= FREE_SHIPPING_THRESHOLD || items.value.length === 0
      ? 0
      : SHIPPING_COST
  )

  const tax = computed(() => subtotalAfterDiscount.value * TAX_RATE)

  const total = computed(() =>
    subtotalAfterDiscount.value + shipping.value + tax.value
  )

  function applyDiscount(code, percent) {
    discountCode.value = code
    discountPercent.value = Math.max(0, Math.min(100, percent))
  }

  function clearDiscount() {
    discountCode.value = null
    discountPercent.value = 0
  }

  return {
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    shipping,
    tax,
    total,
    applyDiscount,
    clearDiscount,
  }
}
