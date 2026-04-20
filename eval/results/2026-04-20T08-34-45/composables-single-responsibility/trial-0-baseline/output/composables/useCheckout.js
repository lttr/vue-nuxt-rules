import { ref, readonly } from 'vue'
import { useCart } from './useCart.js'
import { useCartTotals } from './useCartTotals.js'

export const CheckoutStatus = Object.freeze({
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
})

export function useCheckout(apiBase = '/api') {
  const status = ref(CheckoutStatus.IDLE)
  const error = ref(null)
  const orderId = ref(null)

  const { items, clearCart } = useCart()
  const { total } = useCartTotals()

  async function checkout(payload) {
    if (!items.value.length) {
      error.value = 'Cart is empty'
      return null
    }

    status.value = CheckoutStatus.PROCESSING
    error.value = null
    orderId.value = null

    try {
      const res = await fetch(`${apiBase}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          ...payload,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? `Checkout failed: ${res.statusText}`)
      }

      const order = await res.json()
      orderId.value = order.id
      status.value = CheckoutStatus.SUCCESS
      clearCart()
      return order
    } catch (err) {
      error.value = err.message
      status.value = CheckoutStatus.FAILED
      throw err
    }
  }

  function reset() {
    status.value = CheckoutStatus.IDLE
    error.value = null
    orderId.value = null
  }

  return {
    status: readonly(status),
    error: readonly(error),
    orderId: readonly(orderId),
    checkout,
    reset,
  }
}
