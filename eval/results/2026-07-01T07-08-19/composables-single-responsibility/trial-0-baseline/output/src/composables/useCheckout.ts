import { ref } from 'vue'
import type { CheckoutResult, ShippingAddress } from '../types/cart'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

const CHECKOUT_ENDPOINT = '/api/checkout'

export function useCheckout() {
  const { items, clearCart } = useCartItems()
  const { total, appliedDiscount } = useCartTotals()

  const isProcessing = ref(false)
  const error = ref<string | null>(null)
  const result = ref<CheckoutResult | null>(null)

  async function processCheckout(shippingAddress: ShippingAddress): Promise<CheckoutResult> {
    if (items.value.length === 0) {
      throw new Error('Cannot check out with an empty cart')
    }

    isProcessing.value = true
    error.value = null
    result.value = null

    try {
      const response = await fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          discountCode: appliedDiscount.value?.code,
          shippingAddress,
        }),
      })

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status}`)
      }

      const data: CheckoutResult = await response.json()
      result.value = data

      if (data.status === 'confirmed') {
        clearCart()
      }

      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown checkout error'
      error.value = message
      throw err
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    error,
    result,
    total,
    processCheckout,
  }
}
