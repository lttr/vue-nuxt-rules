import { ref } from 'vue'

export function useCheckout(apiBaseUrl = '/api/checkout') {
  const isProcessing = ref(false)
  const error = ref(null)
  const confirmation = ref(null)

  async function processCheckout(payload) {
    isProcessing.value = true
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
      confirmation.value = await response.json()
      return confirmation.value
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
    confirmation,
    processCheckout,
  }
}
