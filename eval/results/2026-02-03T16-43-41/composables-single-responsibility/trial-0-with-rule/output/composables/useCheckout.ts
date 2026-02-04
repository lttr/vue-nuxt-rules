import { ref, type Ref } from 'vue'
import type { CartItem } from './useCartItems'
import type { Discount } from './useCartTotals'

export interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'bank_transfer'
  cardLastFour?: string
}

export interface CheckoutData {
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentInfo: PaymentInfo
  discount?: Discount | null
  subtotal: number
  discountAmount: number
  tax: number
  total: number
}

export interface OrderResult {
  orderId: string
  status: 'confirmed' | 'pending' | 'failed'
  estimatedDelivery?: string
}

export interface UseCheckoutOptions {
  baseUrl?: string
  onSuccess?: (result: OrderResult) => void
  onError?: (error: Error) => void
}

export interface UseCheckoutReturn {
  isProcessing: Ref<boolean>
  error: Ref<Error | null>
  lastOrder: Ref<OrderResult | null>
  processCheckout: (data: CheckoutData) => Promise<OrderResult | null>
  validateCheckout: (data: Partial<CheckoutData>) => string[]
}

export function useCheckout(options: UseCheckoutOptions = {}): UseCheckoutReturn {
  const { baseUrl = '/api/checkout', onSuccess, onError } = options

  const isProcessing = ref(false)
  const error = ref<Error | null>(null)
  const lastOrder = ref<OrderResult | null>(null)

  function validateCheckout(data: Partial<CheckoutData>): string[] {
    const errors: string[] = []

    if (!data.items?.length) {
      errors.push('Cart is empty')
    }

    if (!data.shippingAddress) {
      errors.push('Shipping address is required')
    } else {
      const addr = data.shippingAddress
      if (!addr.name) errors.push('Name is required')
      if (!addr.street) errors.push('Street address is required')
      if (!addr.city) errors.push('City is required')
      if (!addr.postalCode) errors.push('Postal code is required')
      if (!addr.country) errors.push('Country is required')
    }

    if (!data.paymentInfo) {
      errors.push('Payment information is required')
    }

    return errors
  }

  async function processCheckout(data: CheckoutData): Promise<OrderResult | null> {
    const validationErrors = validateCheckout(data)
    if (validationErrors.length > 0) {
      const err = new Error(`Validation failed: ${validationErrors.join(', ')}`)
      error.value = err
      onError?.(err)
      return null
    }

    isProcessing.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.statusText}`)
      }

      const result = await response.json() as OrderResult
      lastOrder.value = result
      onSuccess?.(result)
      return result
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err
      onError?.(err)
      return null
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    error,
    lastOrder,
    processCheckout,
    validateCheckout,
  }
}
