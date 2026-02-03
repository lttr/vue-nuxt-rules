import { computed, ref } from 'vue'
import { useCartItems } from './useCartItems'

export function useCartTotals() {
  const { items } = useCartItems()
  const discountCode = ref(null)
  const discountPercent = ref(0)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() =>
    Math.round(subtotal.value * (discountPercent.value / 100) * 100) / 100
  )

  const total = computed(() =>
    Math.round((subtotal.value - discountAmount.value) * 100) / 100
  )

  async function applyDiscount(code, apiBase = '/api/discounts') {
    const response = await fetch(`${apiBase}/${encodeURIComponent(code)}`)
    if (!response.ok) throw new Error('Invalid discount code')
    const data = await response.json()
    discountCode.value = code
    discountPercent.value = data.percent
    return data
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
    total,
    applyDiscount,
    clearDiscount,
  }
}
