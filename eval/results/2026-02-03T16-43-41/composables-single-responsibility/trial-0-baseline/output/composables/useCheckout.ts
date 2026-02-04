import { ref, computed } from 'vue'
import type { CartItem } from './useCart'
import type { CartTotals, Discount } from './useCartTotals'

export interface ShippingAddress {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'applepay'
  cardLast4?: string
}

export interface CheckoutData {
  items: CartItem[]
  totals: CartTotals
  shippingAddress: ShippingAddress
  billingAddress?: ShippingAddress
  paymentInfo: PaymentInfo
  discount?: Discount
}

export interface OrderResult {
  orderId: string
  status: 'confirmed' | 'pending' | 'failed'
  estimatedDelivery?: string
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'review' | 'confirmation'

export function useCheckout() {
  const currentStep = ref<CheckoutStep>('cart')
  const shippingAddress = ref<ShippingAddress | null>(null)
  const billingAddress = ref<ShippingAddress | null>(null)
  const useSameAddress = ref(true)
  const paymentInfo = ref<PaymentInfo | null>(null)
  const processing = ref(false)
  const error = ref<string | null>(null)
  const orderResult = ref<OrderResult | null>(null)

  const steps: CheckoutStep[] = ['cart', 'shipping', 'payment', 'review', 'confirmation']

  const currentStepIndex = computed(() => steps.indexOf(currentStep.value))

  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 'cart':
        return true
      case 'shipping':
        return isValidAddress(shippingAddress.value)
      case 'payment':
        return paymentInfo.value !== null
      case 'review':
        return true
      default:
        return false
    }
  })

  function isValidAddress(address: ShippingAddress | null): boolean {
    if (!address) return false
    return !!(
      address.firstName &&
      address.lastName &&
      address.address1 &&
      address.city &&
      address.state &&
      address.postalCode &&
      address.country
    )
  }

  function nextStep() {
    const nextIndex = currentStepIndex.value + 1
    if (nextIndex < steps.length) {
      currentStep.value = steps[nextIndex]
    }
  }

  function previousStep() {
    const prevIndex = currentStepIndex.value - 1
    if (prevIndex >= 0) {
      currentStep.value = steps[prevIndex]
    }
  }

  function goToStep(step: CheckoutStep) {
    currentStep.value = step
  }

  function setShippingAddress(address: ShippingAddress) {
    shippingAddress.value = address
    if (useSameAddress.value) {
      billingAddress.value = address
    }
  }

  function setBillingAddress(address: ShippingAddress) {
    billingAddress.value = address
  }

  function setPaymentInfo(info: PaymentInfo) {
    paymentInfo.value = info
  }

  async function processCheckout(
    items: CartItem[],
    totals: CartTotals,
    discount?: Discount | null
  ): Promise<OrderResult> {
    if (!shippingAddress.value || !paymentInfo.value) {
      throw new Error('Missing required checkout information')
    }

    processing.value = true
    error.value = null

    try {
      const checkoutData: CheckoutData = {
        items,
        totals,
        shippingAddress: shippingAddress.value,
        billingAddress: useSameAddress.value ? undefined : billingAddress.value ?? undefined,
        paymentInfo: paymentInfo.value,
        discount: discount ?? undefined,
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Checkout failed: ${response.statusText}`)
      }

      const result: OrderResult = await response.json()
      orderResult.value = result
      currentStep.value = 'confirmation'
      return result
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Checkout failed'
      throw e
    } finally {
      processing.value = false
    }
  }

  function reset() {
    currentStep.value = 'cart'
    shippingAddress.value = null
    billingAddress.value = null
    useSameAddress.value = true
    paymentInfo.value = null
    processing.value = false
    error.value = null
    orderResult.value = null
  }

  return {
    currentStep,
    currentStepIndex,
    steps,
    shippingAddress,
    billingAddress,
    useSameAddress,
    paymentInfo,
    processing,
    error,
    orderResult,
    canProceed,
    nextStep,
    previousStep,
    goToStep,
    setShippingAddress,
    setBillingAddress,
    setPaymentInfo,
    processCheckout,
    reset,
  }
}
