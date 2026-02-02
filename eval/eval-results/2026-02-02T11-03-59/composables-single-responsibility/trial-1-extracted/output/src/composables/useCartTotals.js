import { computed, ref } from 'vue'

export function useCartTotals(items) {
  const discountCode = ref(null)
  const discountPercentage = ref(0)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const discountAmount = computed(() => subtotal.value * (discountPercentage.value / 100))

  const total = computed(() => subtotal.value - discountAmount.value)

  async function applyDiscount(code) {
    const response = await fetch(`/api/discounts/${encodeURIComponent(code)}`)
    if (!response.ok) throw new Error('Invalid discount code')
    const data = await response.json()
    discountCode.value = code
    discountPercentage.value = data.percentage
  }

  function removeDiscount() {
    discountCode.value = null
    discountPercentage.value = 0
  }

  return {
    subtotal,
    itemCount,
    discountCode,
    discountPercentage,
    discountAmount,
    total,
    applyDiscount,
    removeDiscount,
  }
}
