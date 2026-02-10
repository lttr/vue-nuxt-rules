import { ref } from 'vue'

/**
 * Composable for processing checkout.
 */
export function useCartCheckout(apiBase = '/api/checkout') {
  const processing = ref(false)
  const checkoutError = ref(null)
  const order = ref(null)

  async function checkout(items, totals) {
    processing.value = true
    checkoutError.value = null
    order.value = null
    try {
      const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal: totals.subtotal,
          discount: totals.discountAmount,
          total: totals.total,
        }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      order.value = await res.json()
    } catch (err) {
      checkoutError.value = err
    } finally {
      processing.value = false
    }
    return order.value
  }

  return {
    processing,
    checkoutError,
    order,
    checkout,
  }
}
