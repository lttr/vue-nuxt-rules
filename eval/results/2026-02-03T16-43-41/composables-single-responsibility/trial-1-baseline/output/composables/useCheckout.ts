import { ref, computed } from 'vue'
import { useCart } from './useCart'
import { useCartTotals } from './useCartTotals'

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'applepay' | 'googlepay'
  cardLast4?: string
}

export interface CheckoutResult {
  success: boolean
  orderId?: string
  error?: string
}

export type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'review' | 'complete'

export function useCheckout(apiUrl = '/api/checkout') {
  const { items, clearCart } = useCart()
  const { total, appliedDiscount } = useCartTotals()

  const currentStep = ref<CheckoutStep>('cart')
  const shippingAddress = ref<ShippingAddress | null>(null)
  const paymentInfo = ref<PaymentInfo | null>(null)
  const isProcessing = ref(false)
  const error = ref<Error | null>(null)
  const orderId = ref<string | null>(null)

  const canProceedToPayment = computed(() => shippingAddress.value !== null)
  const canProceedToReview = computed(() =>
    shippingAddress.value !== null && paymentInfo.value !== null
  )
  const isReadyToSubmit = computed(() =>
    items.value.length > 0 && canProceedToReview.value
  )

  function setShippingAddress(address: ShippingAddress) {
    shippingAddress.value = address
  }

  function setPaymentInfo(payment: PaymentInfo) {
    paymentInfo.value = payment
  }

  function goToStep(step: CheckoutStep) {
    currentStep.value = step
  }

  function nextStep() {
    const steps: CheckoutStep[] = ['cart', 'shipping', 'payment', 'review', 'complete']
    const currentIndex = steps.indexOf(currentStep.value)
    if (currentIndex < steps.length - 1) {
      currentStep.value = steps[currentIndex + 1]
    }
  }

  function previousStep() {
    const steps: CheckoutStep[] = ['cart', 'shipping', 'payment', 'review', 'complete']
    const currentIndex = steps.indexOf(currentStep.value)
    if (currentIndex > 0) {
      currentStep.value = steps[currentIndex - 1]
    }
  }

  async function processCheckout(): Promise<CheckoutResult> {
    if (!isReadyToSubmit.value) {
      return { success: false, error: 'Missing required checkout information' }
    }

    isProcessing.value = true
    error.value = null

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.value,
          shippingAddress: shippingAddress.value,
          paymentInfo: {
            method: paymentInfo.value?.method,
          },
          total: total.value,
          discountCode: appliedDiscount.value?.code,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Checkout failed: ${response.statusText}`)
      }

      const data = await response.json()
      orderId.value = data.orderId

      clearCart()
      currentStep.value = 'complete'

      return { success: true, orderId: data.orderId }
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      error.value = err
      return { success: false, error: err.message }
    } finally {
      isProcessing.value = false
    }
  }

  async function validateDiscountCode(code: string): Promise<{ valid: boolean; discount?: { type: 'percentage' | 'fixed'; value: number } }> {
    try {
      const response = await fetch(`${apiUrl}/validate-discount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        return { valid: false }
      }

      const data = await response.json()
      return { valid: true, discount: data.discount }
    } catch {
      return { valid: false }
    }
  }

  function resetCheckout() {
    currentStep.value = 'cart'
    shippingAddress.value = null
    paymentInfo.value = null
    error.value = null
    orderId.value = null
  }

  return {
    currentStep,
    shippingAddress,
    paymentInfo,
    isProcessing,
    error,
    orderId,
    canProceedToPayment,
    canProceedToReview,
    isReadyToSubmit,
    setShippingAddress,
    setPaymentInfo,
    goToStep,
    nextStep,
    previousStep,
    processCheckout,
    validateDiscountCode,
    resetCheckout,
  }
}
