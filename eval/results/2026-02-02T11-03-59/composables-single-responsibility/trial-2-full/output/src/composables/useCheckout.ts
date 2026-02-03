import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

export interface CheckoutPayload {
  items: { id: string; quantity: number }[]
  discountCode: string | null
  total: number
}

export function useCheckout(apiBase = '/api/checkout') {
  const { items, clearCart } = useCartItems()
  const { total, discount, removeDiscount } = useCartTotals()
  const isProcessing = ref(false)
  const error = ref<string | null>(null)

  async function checkout() {
    if (items.value.length === 0) {
      error.value = 'Cart is empty'
      return false
    }

    isProcessing.value = true
    error.value = null

    const payload: CheckoutPayload = {
      items: items.value.map(({ id, quantity }) => ({ id, quantity })),
      discountCode: discount.value?.code ?? null,
      total: total.value,
    }

    try {
      const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`Checkout failed: ${response.statusText}`)
      clearCart()
      removeDiscount()
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return false
    } finally {
      isProcessing.value = false
    }
  }

  return { checkout, isProcessing, error }
}
