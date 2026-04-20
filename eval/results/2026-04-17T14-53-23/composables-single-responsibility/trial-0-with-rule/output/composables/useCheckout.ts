import { ref } from 'vue'
import { useCartState } from './useCartState'

export interface CheckoutPayload {
  paymentMethodId: string
  shippingAddressId: string
  discountCode?: string
}

export interface CheckoutResult {
  orderId: string
  total: number
}

export function useCheckout() {
  const { items, setItems } = useCartState()
  const processing = ref(false)
  const error = ref<Error | null>(null)
  const result = ref<CheckoutResult | null>(null)

  async function checkout(payload: CheckoutPayload) {
    processing.value = true
    error.value = null
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          items: items.value.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)
      const data = (await res.json()) as CheckoutResult
      result.value = data
      setItems([])
      return data
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      processing.value = false
    }
  }

  return { checkout, processing, error, result }
}
