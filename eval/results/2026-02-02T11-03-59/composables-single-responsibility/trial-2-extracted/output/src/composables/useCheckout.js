import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

export function useCheckout(apiBase = '/api/checkout') {
  const { items, clearCart } = useCartItems()
  const { total, discountCode, clearDiscount } = useCartTotals()
  const processing = ref(false)
  const error = ref(null)
  const lastOrder = ref(null)

  async function checkout(paymentDetails) {
    if (items.value.length === 0) {
      throw new Error('Cart is empty')
    }

    processing.value = true
    error.value = null
    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          discountCode: discountCode.value,
          payment: paymentDetails,
        }),
      })
      if (!response.ok) throw new Error(`Checkout failed: ${response.status}`)
      const order = await response.json()
      lastOrder.value = order
      clearCart()
      clearDiscount()
      return order
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      processing.value = false
    }
  }

  return {
    processing,
    error,
    lastOrder,
    checkout,
  }
}
