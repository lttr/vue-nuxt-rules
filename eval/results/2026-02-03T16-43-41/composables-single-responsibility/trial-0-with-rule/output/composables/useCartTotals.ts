import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { CartItem } from './useCartItems'

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

export interface UseCartTotalsOptions {
  taxRate?: number
}

export interface UseCartTotalsReturn {
  subtotal: ComputedRef<number>
  discount: Ref<Discount | null>
  discountAmount: ComputedRef<number>
  tax: ComputedRef<number>
  total: ComputedRef<number>
  applyDiscount: (discount: Discount) => void
  removeDiscount: () => void
}

export function useCartTotals(
  items: Ref<CartItem[]>,
  options: UseCartTotalsOptions = {}
): UseCartTotalsReturn {
  const { taxRate = 0 } = options

  const discount = ref<Discount | null>(null)

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() => {
    if (!discount.value) return 0

    if (discount.value.type === 'percentage') {
      return subtotal.value * (discount.value.value / 100)
    }

    return Math.min(discount.value.value, subtotal.value)
  })

  const tax = computed(() => {
    const taxableAmount = subtotal.value - discountAmount.value
    return taxableAmount * taxRate
  })

  const total = computed(() =>
    subtotal.value - discountAmount.value + tax.value
  )

  function applyDiscount(newDiscount: Discount): void {
    discount.value = newDiscount
  }

  function removeDiscount(): void {
    discount.value = null
  }

  return {
    subtotal,
    discount,
    discountAmount,
    tax,
    total,
    applyDiscount,
    removeDiscount,
  }
}
