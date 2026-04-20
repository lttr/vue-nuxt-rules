import { ref, computed, unref } from 'vue'

const TAX_RATE = 0.08
const FREE_SHIPPING_THRESHOLD = 50
const SHIPPING_FEE = 5.99

export function useCartTotals(itemsRef) {
  const discountCode = ref(null)
  const discountPercent = ref(0)

  const subtotal = computed(() =>
    unref(itemsRef).reduce((sum, i) => sum + i.price * i.quantity, 0)
  )

  const discount = computed(() =>
    +(subtotal.value * (discountPercent.value / 100)).toFixed(2)
  )

  const shipping = computed(() =>
    subtotal.value >= FREE_SHIPPING_THRESHOLD || subtotal.value === 0
      ? 0
      : SHIPPING_FEE
  )

  const tax = computed(() =>
    +((subtotal.value - discount.value) * TAX_RATE).toFixed(2)
  )

  const total = computed(() =>
    +(subtotal.value - discount.value + shipping.value + tax.value).toFixed(2)
  )

  const applyDiscount = (code, percent) => {
    discountCode.value = code
    discountPercent.value = percent
  }

  const clearDiscount = () => {
    discountCode.value = null
    discountPercent.value = 0
  }

  return {
    subtotal,
    discount,
    discountCode,
    discountPercent,
    shipping,
    tax,
    total,
    applyDiscount,
    clearDiscount,
  }
}
