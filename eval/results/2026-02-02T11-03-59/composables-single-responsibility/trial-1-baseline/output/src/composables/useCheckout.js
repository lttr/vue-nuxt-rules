import { ref, reactive } from 'vue'

export function useCheckout(baseUrl = '/api/checkout') {
  const processing = ref(false)
  const error = ref(null)
  const order = ref(null)

  const checkoutState = reactive({
    step: 'cart', // cart | shipping | payment | confirmation
    shippingInfo: null,
    paymentInfo: null,
  })

  function setShippingInfo(info) {
    checkoutState.shippingInfo = info
    checkoutState.step = 'payment'
  }

  function setPaymentInfo(info) {
    checkoutState.paymentInfo = info
  }

  function goToStep(step) {
    checkoutState.step = step
  }

  async function processCheckout({ items, totals, discountCode }) {
    processing.value = true
    error.value = null
    order.value = null

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal: totals.subtotal,
          discount: totals.discount,
          tax: totals.tax,
          total: totals.total,
          discountCode,
          shipping: checkoutState.shippingInfo,
          payment: checkoutState.paymentInfo,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || `Checkout failed: ${response.status}`)
      }

      order.value = await response.json()
      checkoutState.step = 'confirmation'
      return order.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      processing.value = false
    }
  }

  function resetCheckout() {
    processing.value = false
    error.value = null
    order.value = null
    checkoutState.step = 'cart'
    checkoutState.shippingInfo = null
    checkoutState.paymentInfo = null
  }

  return {
    processing,
    error,
    order,
    checkoutState,
    setShippingInfo,
    setPaymentInfo,
    goToStep,
    processCheckout,
    resetCheckout,
  }
}
