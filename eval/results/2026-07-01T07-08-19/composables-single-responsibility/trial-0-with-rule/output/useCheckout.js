import { ref } from 'vue'

export function useCheckout(apiBaseUrl = '/api/checkout') {
  const isSubmitting = ref(false)
  const error = ref(null)
  const order = ref(null)

  async function submitCheckout(payload) {
    isSubmitting.value = true
    error.value = null
    try {
      const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status}`)
      }
      order.value = await response.json()
      return order.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    error,
    order,
    submitCheckout,
  }
}
