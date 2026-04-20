import { computed } from 'vue'
import { useCart } from './useCart.js'

export function useCartTotals(discountCodes = ref({})) {
  const { items } = useCart()

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
  )

  const appliedDiscount = computed(() => {
    const codes = Object.values(discountCodes.value)
    if (!codes.length) return 0

    const percentOff = codes
      .filter(c => c.type === 'percent')
      .reduce((sum, c) => sum + c.value, 0)

    const flatOff = codes
      .filter(c => c.type === 'flat')
      .reduce((sum, c) => sum + c.value, 0)

    const percentDiscount = subtotal.value * Math.min(percentOff, 100) / 100
    return Math.min(percentDiscount + flatOff, subtotal.value)
  })

  const taxRate = 0.08
  const taxableAmount = computed(() => subtotal.value - appliedDiscount.value)
  const tax = computed(() => taxableAmount.value * taxRate)

  const total = computed(() => taxableAmount.value + tax.value)

  const savings = computed(() => appliedDiscount.value)

  function applyDiscount(code, discount) {
    discountCodes.value = { ...discountCodes.value, [code]: discount }
  }

  function removeDiscount(code) {
    const { [code]: _, ...rest } = discountCodes.value
    discountCodes.value = rest
  }

  return { subtotal, appliedDiscount, tax, total, savings, applyDiscount, removeDiscount }
}
