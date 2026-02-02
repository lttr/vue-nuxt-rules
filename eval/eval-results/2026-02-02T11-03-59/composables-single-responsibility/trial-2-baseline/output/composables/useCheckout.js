import { ref, reactive } from 'vue'

export function useCheckout(cartApi, cartItems, cartTotals) {
  const step = ref('details') // 'details' | 'payment' | 'confirmation'
  const orderId = ref(null)
  const processing = ref(false)
  const checkoutError = ref(null)

  const customerDetails = reactive({
    name: '',
    email: '',
    address: '',
  })

  const paymentDetails = reactive({
    method: 'card', // 'card' | 'paypal'
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  function validate() {
    const errors = []
    if (!customerDetails.name.trim()) errors.push('Name is required')
    if (!customerDetails.email.trim()) errors.push('Email is required')
    if (!customerDetails.address.trim()) errors.push('Address is required')
    if (cartItems.isEmpty.value) errors.push('Cart is empty')
    return errors
  }

  function goToStep(newStep) {
    step.value = newStep
  }

  async function processCheckout() {
    const errors = validate()
    if (errors.length > 0) {
      checkoutError.value = errors.join(', ')
      return { success: false, errors }
    }

    processing.value = true
    checkoutError.value = null

    try {
      const orderData = {
        items: cartItems.items.value.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        customer: { ...customerDetails },
        payment: { method: paymentDetails.method },
        discountCode: cartTotals.discountCode.value,
        subtotal: cartTotals.subtotal.value,
        discount: cartTotals.discountAmount.value,
        tax: cartTotals.taxAmount.value,
        total: cartTotals.total.value,
      }

      const result = await cartApi.submitOrder(orderData)
      orderId.value = result.orderId
      cartItems.clearCart()
      cartTotals.removeDiscount()
      step.value = 'confirmation'
      return { success: true, orderId: result.orderId }
    } catch (err) {
      checkoutError.value = err.message
      return { success: false, errors: [err.message] }
    } finally {
      processing.value = false
    }
  }

  function resetCheckout() {
    step.value = 'details'
    orderId.value = null
    processing.value = false
    checkoutError.value = null
    customerDetails.name = ''
    customerDetails.email = ''
    customerDetails.address = ''
    paymentDetails.method = 'card'
    paymentDetails.cardNumber = ''
    paymentDetails.expiry = ''
    paymentDetails.cvv = ''
  }

  return {
    step,
    orderId,
    processing,
    checkoutError,
    customerDetails,
    paymentDetails,
    validate,
    goToStep,
    processCheckout,
    resetCheckout,
  }
}
