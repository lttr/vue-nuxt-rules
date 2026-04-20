import { ref } from 'vue'

export function useCheckout() {
  const isProcessing = ref(false)
  const error = ref(null)
  const order = ref(null)

  const checkout = async ({ items, total, paymentMethod, shippingAddress }) => {
    isProcessing.value = true
    error.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, paymentMethod, shippingAddress }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      order.value = await res.json()
      return order.value
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
    order,
    checkout,
  }
}
