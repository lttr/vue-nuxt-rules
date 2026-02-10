import { ref, computed } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

export type CheckoutStatus =
  | 'idle'
  | 'validating'
  | 'processing'
  | 'success'
  | 'error'

export interface ShippingInfo {
  name: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'bank_transfer'
  token?: string
}

export interface CheckoutResult {
  orderId: string
  status: string
}

export interface CheckoutOptions {
  checkoutUrl?: string
  headers?: Record<string, string>
}

const DEFAULT_CHECKOUT_URL = '/api/checkout'

export function useCheckout(options: CheckoutOptions = {}) {
  const { checkoutUrl = DEFAULT_CHECKOUT_URL, headers = {} } = options
  const { items, clearCart } = useCartItems()
  const { total, discount } = useCartTotals()

  const status = ref<CheckoutStatus>('idle')
  const error = ref<string | null>(null)
  const lastOrder = ref<CheckoutResult | null>(null)

  const canCheckout = computed(
    () => items.value.length > 0 && status.value !== 'processing'
  )

  function validate(shipping: ShippingInfo): string[] {
    const errors: string[] = []
    if (!shipping.name.trim()) errors.push('Name is required')
    if (!shipping.address.trim()) errors.push('Address is required')
    if (!shipping.city.trim()) errors.push('City is required')
    if (!shipping.postalCode.trim()) errors.push('Postal code is required')
    if (!shipping.country.trim()) errors.push('Country is required')
    return errors
  }

  async function processCheckout(
    shipping: ShippingInfo,
    payment: PaymentInfo
  ): Promise<CheckoutResult | null> {
    error.value = null
    status.value = 'validating'

    const validationErrors = validate(shipping)
    if (validationErrors.length > 0) {
      error.value = validationErrors.join(', ')
      status.value = 'error'
      return null
    }

    status.value = 'processing'

    try {
      const res = await fetch(checkoutUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({
          items: items.value,
          total: total.value,
          discount: discount.value,
          shipping,
          payment,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || `Checkout failed: ${res.status}`)
      }

      const result: CheckoutResult = await res.json()
      lastOrder.value = result
      status.value = 'success'
      clearCart()
      return result
    } catch (err) {
      error.value = (err as Error).message
      status.value = 'error'
      return null
    }
  }

  function reset() {
    status.value = 'idle'
    error.value = null
  }

  return {
    status,
    error,
    lastOrder,
    canCheckout,
    validate,
    processCheckout,
    reset,
  }
}
