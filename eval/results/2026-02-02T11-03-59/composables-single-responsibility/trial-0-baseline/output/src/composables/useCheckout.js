import { ref, reactive } from 'vue'

export function useCheckout(baseUrl = '/api/checkout') {
  const loading = ref(false)
  const error = ref(null)
  const order = ref(null)

  const checkoutState = reactive({
    step: 'idle', // idle | shipping | payment | review | processing | complete | failed
  })

  function setStep(step) {
    checkoutState.step = step
  }

  async function processCheckout({ items, totals, shipping, payment }) {
    loading.value = true
    error.value = null
    checkoutState.step = 'processing'

    try {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal: totals.subtotal,
          discount: totals.discount,
          tax: totals.tax,
          total: totals.total,
          couponCode: totals.couponCode ?? null,
          shipping,
          payment,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || `Checkout failed: ${res.status}`)
      }

      order.value = await res.json()
      checkoutState.step = 'complete'
      return order.value
    } catch (err) {
      error.value = err.message
      checkoutState.step = 'failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
    order.value = null
    checkoutState.step = 'idle'
  }

  return {
    loading,
    error,
    order,
    checkoutState,
    setStep,
    processCheckout,
    reset,
  }
}
