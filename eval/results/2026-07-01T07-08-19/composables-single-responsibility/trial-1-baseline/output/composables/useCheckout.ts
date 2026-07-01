import { ref } from 'vue'
import type { CheckoutPayload, CheckoutResult } from '../types/cart'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

const CHECKOUT_API = '/api/checkout'

export function useCheckout() {
  const { items, clearCart } = useCartItems()
  const { appliedDiscount } = useCartTotals()
  const isProcessing = ref(false)
  const error = ref<string | null>(null)
  const result = ref<CheckoutResult | null>(null)

  async function checkout(params: {
    shippingAddressId: string
    paymentMethodId: string
  }): Promise<CheckoutResult> {
    if (items.value.length === 0) {
      throw new Error('Cannot checkout with an empty cart')
    }

    isProcessing.value = true
    error.value = null
    result.value = null

    const payload: CheckoutPayload = {
      items: items.value,
      discountCode: appliedDiscount.value?.code,
      shippingAddressId: params.shippingAddressId,
      paymentMethodId: params.paymentMethodId,
    }

    try {
      const res = await fetch(CHECKOUT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Checkout failed: ${res.status}`)

      const data: CheckoutResult = await res.json()
      result.value = data

      if (data.status === 'confirmed') {
        clearCart()
      }

      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown checkout error'
      throw e
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    error,
    result,
    checkout,
  }
}
