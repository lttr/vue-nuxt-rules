import { ref } from 'vue'
import { useCart } from './useCart.js'
import { useCartTotals } from './useCartTotals.js'

const CHECKOUT_ENDPOINT = '/api/checkout'

export function useCheckout() {
  const { items, clearCart } = useCart()
  const { total, discountCode } = useCartTotals()

  const isProcessing = ref(false)
  const error = ref(null)
  const orderId = ref(null)

  async function checkout(paymentDetails, shippingAddress) {
    if (items.value.length === 0) {
      throw new Error('Cannot checkout with an empty cart')
    }

    isProcessing.value = true
    error.value = null
    orderId.value = null

    try {
      const response = await fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          discountCode: discountCode.value,
          payment: paymentDetails,
          shipping: shippingAddress,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `Checkout failed: ${response.status}`)
      }

      const result = await response.json()
      orderId.value = result.orderId
      clearCart()
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    error,
    orderId,
    checkout,
  }
}
