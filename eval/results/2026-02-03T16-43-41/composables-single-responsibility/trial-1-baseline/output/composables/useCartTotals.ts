import { ref, computed } from 'vue'
import { useCart } from './useCart'

export interface Discount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

export function useCartTotals() {
  const { items } = useCart()
  const appliedDiscount = ref<Discount | null>(null)
  const taxRate = ref(0)
  const shippingCost = ref(0)

  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const discountAmount = computed(() => {
    if (!appliedDiscount.value) return 0

    if (appliedDiscount.value.type === 'percentage') {
      return subtotal.value * (appliedDiscount.value.value / 100)
    }

    return Math.min(appliedDiscount.value.value, subtotal.value)
  })

  const subtotalAfterDiscount = computed(() =>
    Math.max(0, subtotal.value - discountAmount.value)
  )

  const taxAmount = computed(() =>
    subtotalAfterDiscount.value * (taxRate.value / 100)
  )

  const total = computed(() =>
    subtotalAfterDiscount.value + taxAmount.value + shippingCost.value
  )

  function applyDiscount(discount: Discount) {
    appliedDiscount.value = discount
  }

  function removeDiscount() {
    appliedDiscount.value = null
  }

  function setTaxRate(rate: number) {
    taxRate.value = Math.max(0, rate)
  }

  function setShippingCost(cost: number) {
    shippingCost.value = Math.max(0, cost)
  }

  function formatCurrency(amount: number, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount)
  }

  return {
    subtotal,
    discountAmount,
    subtotalAfterDiscount,
    taxAmount,
    taxRate,
    shippingCost,
    total,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
    setTaxRate,
    setShippingCost,
    formatCurrency,
  }
}
