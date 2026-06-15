import { ref } from 'vue'
import { useCartState } from './useCartState'
import { useCartItems } from './useCartItems'

/**
 * Process checkout: submit the cart to the API and finalise the order.
 *
 * Single responsibility: the checkout transaction. Delegates clearing
 * the cart to useCartItems rather than reaching into state directly.
 */
export function useCheckout() {
  const { items } = useCartState()
  const { clear } = useCartItems()

  const processing = ref(false)
  const error = ref(null)
  const order = ref(null)

  async function checkout(payment) {
    if (items.length === 0) throw new Error('Cannot check out an empty cart')

    processing.value = true
    error.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          payment,
        }),
      })
      if (!res.ok) throw new Error(`Checkout failed (${res.status})`)
      order.value = await res.json()
      clear()
      return order.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      processing.value = false
    }
  }

  return {
    processing,
    error,
    order,
    checkout,
  }
}
