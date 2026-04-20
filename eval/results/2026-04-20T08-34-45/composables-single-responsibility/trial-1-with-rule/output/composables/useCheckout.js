import { ref } from 'vue'

export function useCheckout(items) {
  const processing = ref(false)
  const error = ref(null)
  const orderId = ref(null)

  async function checkout(paymentDetails) {
    processing.value = true
    error.value = null
    orderId.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.value, payment: paymentDetails }),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      orderId.value = data.orderId
      items.value = []
    } catch (e) {
      error.value = e.message
    } finally {
      processing.value = false
    }
  }

  return { processing, error, orderId, checkout }
}
