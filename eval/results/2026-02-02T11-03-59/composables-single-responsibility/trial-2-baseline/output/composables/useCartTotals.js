import { ref, computed } from 'vue'

export function useCartTotals(items) {
  const discountCode = ref(null)
  const discountPercent = ref(0)
  const taxRate = ref(0)

  const DISCOUNT_CODES = {
    SAVE10: 10,
    SAVE20: 20,
    HALF: 50,
  }

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() =>
    subtotal.value * (discountPercent.value / 100)
  )

  const taxAmount = computed(() =>
    (subtotal.value - discountAmount.value) * (taxRate.value / 100)
  )

  const total = computed(() =>
    subtotal.value - discountAmount.value + taxAmount.value
  )

  function applyDiscount(code) {
    const normalized = code.trim().toUpperCase()
    const percent = DISCOUNT_CODES[normalized]
    if (percent == null) {
      discountCode.value = null
      discountPercent.value = 0
      return { success: false, message: 'Invalid discount code' }
    }
    discountCode.value = normalized
    discountPercent.value = percent
    return { success: true, message: `${percent}% discount applied` }
  }

  function removeDiscount() {
    discountCode.value = null
    discountPercent.value = 0
  }

  function setTaxRate(rate) {
    taxRate.value = rate
  }

  return {
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    taxRate,
    taxAmount,
    total,
    applyDiscount,
    removeDiscount,
    setTaxRate,
  }
}
