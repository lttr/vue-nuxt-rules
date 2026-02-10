import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

export interface CheckoutPayload {
  items: { id: string; quantity: number }[]
  discountCode: string | null
  total: number
}

export interface CheckoutResult {
  orderId: string
  status: string
}

export function useCheckout(apiBase = '/api/checkout') {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<CheckoutResult | null>(null)

  const { items, clearCart } = useCartItems()
  const { discount, total, removeDiscount } = useCartTotals()

  async function checkout(): Promise<CheckoutResult | null> {
    if (items.value.length === 0) {
      error.value = 'Cart is empty'
      return null
    }

    loading.value = true
    error.value = null
    result.value = null

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
      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.statusText}`)
      }
      result.value = await response.json()
      clearCart()
      removeDiscount()
      return result.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    result,
    checkout,
  }
}
