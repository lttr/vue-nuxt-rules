import { ref } from 'vue'
import { useCartState } from './useCartState'
import { useCartTotals } from './useCartTotals'

// Responsibility: submitting the cart to the checkout API.
export function useCheckout(totalsOptions = {}) {
  const { items } = useCartState()
  const { total } = useCartTotals(totalsOptions)

  const isProcessing = ref(false)
  const error = ref(null)
  const order = ref(null)

  async function checkout(paymentDetails) {
    isProcessing.value = true
    error.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          payment: paymentDetails,
        }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      order.value = await res.json()
      items.value = []
      return order.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isProcessing.value = false
    }
  }

  return { isProcessing, error, order, checkout }
}
