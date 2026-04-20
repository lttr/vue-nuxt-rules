import { ref } from 'vue'

export function useCheckout() {
  const checkoutStatus = ref(null) // null | 'processing' | 'success' | 'error'
  const orderId = ref(null)
  const error = ref(null)

  async function checkout(cartId, paymentDetails) {
    checkoutStatus.value = 'processing'
    error.value = null
    orderId.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, paymentDetails }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      const data = await res.json()
      orderId.value = data.orderId
      checkoutStatus.value = 'success'
    } catch (err) {
      error.value = err.message
      checkoutStatus.value = 'error'
    }
  }

  function reset() {
    checkoutStatus.value = null
    orderId.value = null
    error.value = null
  }

  return { checkoutStatus, orderId, error, checkout, reset }
}
