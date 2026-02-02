import { ref, computed } from 'vue'

export function useCartTotals(items) {
  const coupon = ref(null)
  const taxRate = ref(0)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discount = computed(() => {
    if (!coupon.value) return 0
    if (coupon.value.type === 'percent') {
      return subtotal.value * (coupon.value.value / 100)
    }
    if (coupon.value.type === 'fixed') {
      return Math.min(coupon.value.value, subtotal.value)
    }
    return 0
  })

  const discountedSubtotal = computed(() => subtotal.value - discount.value)

  const tax = computed(() => discountedSubtotal.value * taxRate.value)

  const total = computed(() => discountedSubtotal.value + tax.value)

  function setCoupon(newCoupon) {
    coupon.value = newCoupon
  }

  function clearCoupon() {
    coupon.value = null
  }

  function setTaxRate(rate) {
    taxRate.value = rate
  }

  return {
    coupon,
    taxRate,
    subtotal,
    discount,
    discountedSubtotal,
    tax,
    total,
    setCoupon,
    clearCoupon,
    setTaxRate,
  }
}
