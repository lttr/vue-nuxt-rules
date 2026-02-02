import { ref } from 'vue'

export function useCheckout(items, total, discountCode) {
  const processing = ref(false)
  const error = ref(null)
  const order = ref(null)

  async function checkout(paymentDetails) {
    if (items.value.length === 0) {
      error.value = 'Cart is empty'
      return false
    }

    processing.value = true
    error.value = null
    try {
      const response = await fetch('/api/checkout', {
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
      order.value = await response.json()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      processing.value = false
    }
  }

  return { processing, error, order, checkout }
}
