import { ref, computed } from 'vue'
import { useCartItems } from './useCartItems'

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

export function useCartTotals() {
  const { items } = useCartItems()

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

  const total = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value)
  )

  const itemizedPrices = computed(() =>
    items.value.map((item) => ({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: item.quantity,
      lineTotal: item.price * item.quantity,
    }))
  )

  function applyDiscount(code: string, type: Discount['type'], value: number) {
    discount.value = { code, type, value }
  }

  function removeDiscount() {
    discount.value = null
  }

  return {
    subtotal,
    discountAmount,
    total,
    discount,
    itemizedPrices,
    applyDiscount,
    removeDiscount,
  }
}
