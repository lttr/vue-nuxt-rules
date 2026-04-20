import { ref, unref } from 'vue'

export function useCheckout({ items, total, onSuccess } = {}) {
  const processing = ref(false)
  const error = ref(null)
  const orderId = ref(null)

  const checkout = async (paymentDetails) => {
    processing.value = true
    error.value = null
    orderId.value = null

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: unref(items),
          total: unref(total),
          payment: paymentDetails,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || `Checkout failed: ${response.status}`)
      }

      const result = await response.json()
      orderId.value = result.orderId
      if (typeof onSuccess === 'function') onSuccess(result)
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      processing.value = false
    }
  }

  const reset = () => {
    error.value = null
    orderId.value = null
  }

  return {
    processing,
    error,
    orderId,
    checkout,
    reset,
  }
}
