import { ref, type Ref } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'
import { useCartTotals, type Discount } from './useCartTotals'

export interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank_transfer'
  details: Record<string, string>
}

export interface CheckoutResult {
  orderId: string
  status: 'success' | 'pending' | 'failed'
  message?: string
}

const processing: Ref<boolean> = ref(false)
const checkoutError: Ref<string | null> = ref(null)

export function useCheckout(apiBaseUrl = '/api') {
  const { items, clearCart } = useCartItems()
  const { total, appliedDiscount, removeDiscount } = useCartTotals()

  async function processCheckout(
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod
  ): Promise<CheckoutResult> {
    processing.value = true
    checkoutError.value = null

    try {
      const orderData = {
        items: items.value,
        total: total.value,
        discount: appliedDiscount.value,
        shippingAddress,
        paymentMethod,
      }

      const response = await fetch(`${apiBaseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Checkout failed: ${response.statusText}`)
      }

      const result: CheckoutResult = await response.json()

      if (result.status === 'success') {
        clearCart()
        removeDiscount()
      }

      return result
    } catch (e) {
      checkoutError.value = e instanceof Error ? e.message : 'Checkout failed'
      throw e
    } finally {
      processing.value = false
    }
  }

  async function validateCheckout(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (items.value.length === 0) {
      errors.push('Cart is empty')
    }

    if (total.value <= 0) {
      errors.push('Invalid cart total')
    }

    return { valid: errors.length === 0, errors }
  }

  return {
    processing,
    checkoutError,
    processCheckout,
    validateCheckout,
  }
}
