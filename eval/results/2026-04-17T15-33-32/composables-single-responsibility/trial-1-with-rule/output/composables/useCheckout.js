import { ref } from 'vue'
import { useCartState } from './useCartState'

export function useCheckout() {
  const { items, setItems } = useCartState()
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
        body: JSON.stringify({
          items: items.value.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          payment: paymentDetails,
        }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      const data = await res.json()
      orderId.value = data.orderId
      setItems([])
      return data
    } catch (e) {
      error.value = e
      throw e
    } finally {
      processing.value = false
    }
  }

  return { checkout, processing, error, orderId }
}
