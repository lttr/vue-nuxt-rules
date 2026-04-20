import { ref, readonly } from 'vue'
import { useCart } from './useCart'
import { useCartTotals } from './useCartTotals'

const STEPS = /** @type {const} */ (['cart', 'shipping', 'payment', 'confirmation'])

export function useCheckout({ discountCode, baseUrl = '/api' } = {}) {
  const step = ref('cart')
  const loading = ref(false)
  const error = ref(null)
  const orderId = ref(null)

  const { items, clearCart } = useCart()
  const { total } = useCartTotals({ discountCode })

  function goToStep(target) {
    const idx = STEPS.indexOf(target)
    if (idx === -1) throw new Error(`Unknown step: ${target}`)
    step.value = target
  }

  function nextStep() {
    const idx = STEPS.indexOf(step.value)
    if (idx < STEPS.length - 1) step.value = STEPS[idx + 1]
  }

  function prevStep() {
    const idx = STEPS.indexOf(step.value)
    if (idx > 0) step.value = STEPS[idx - 1]
  }

  async function submitOrder({ shippingAddress, paymentDetails }) {
    if (items.value.length === 0) {
      error.value = 'Cart is empty'
      return false
    }

    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          discountCode: discountCode?.value ?? null,
          shippingAddress,
          paymentDetails,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? `Order failed: ${res.statusText}`)
      }

      const data = await res.json()
      orderId.value = data.orderId
      clearCart()
      step.value = 'confirmation'
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    step: readonly(step),
    steps: STEPS,
    loading: readonly(loading),
    error: readonly(error),
    orderId: readonly(orderId),
    goToStep,
    nextStep,
    prevStep,
    submitOrder,
  }
}
