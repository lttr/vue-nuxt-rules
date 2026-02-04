import { computed, ref, type Ref, type ComputedRef } from 'vue'
import { useCartItems } from './useCartItems'

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

const appliedDiscount: Ref<Discount | null> = ref(null)

export function useCartTotals() {
  const { items } = useCartItems()

  const itemCount: ComputedRef<number> = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal: ComputedRef<number> = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount: ComputedRef<number> = computed(() => {
    if (!appliedDiscount.value) return 0

    const { type, value } = appliedDiscount.value
    if (type === 'percentage') {
      return subtotal.value * (value / 100)
    }
    return Math.min(value, subtotal.value)
  })

  const total: ComputedRef<number> = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value)
  )

  function applyDiscount(discount: Discount) {
    appliedDiscount.value = discount
  }

  function removeDiscount() {
    appliedDiscount.value = null
  }

  async function validateDiscountCode(
    code: string,
    apiBaseUrl = '/api'
  ): Promise<Discount | null> {
    try {
      const response = await fetch(`${apiBaseUrl}/discounts/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) return null

      const discount: Discount = await response.json()
      return discount
    } catch {
      return null
    }
  }

  return {
    itemCount,
    subtotal,
    discountAmount,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
    validateDiscountCode,
  }
}
