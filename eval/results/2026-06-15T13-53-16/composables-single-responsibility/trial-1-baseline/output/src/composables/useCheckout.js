import { ref, computed, readonly } from 'vue'
import { useCart } from './useCart'

/** Checkout lifecycle states. */
export const CheckoutStatus = Object.freeze({
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
})

/**
 * Drives the checkout flow: validates the cart, submits the order to the
 * API, and exposes status so the UI can show spinners / confirmations.
 *
 * @param {object} [options]
 * @param {string} [options.endpoint='/api/checkout']
 * @param {typeof fetch} [options.fetcher=fetch]
 */
export function useCheckout(options = {}) {
  const { endpoint = '/api/checkout', fetcher = fetch } = options
  const { items, isEmpty, clearCart } = useCart()

  const status = ref(CheckoutStatus.IDLE)
  const error = ref(null)
  const order = ref(null)

  const isProcessing = computed(() => status.value === CheckoutStatus.PROCESSING)

  /**
   * Submit the current cart as an order.
   *
   * @param {object} details - Customer / payment / shipping details.
   * @returns {Promise<object>} the created order
   */
  async function checkout(details = {}) {
    if (isEmpty.value) {
      const err = new Error('Cannot checkout an empty cart')
      status.value = CheckoutStatus.ERROR
      error.value = err
      throw err
    }
    if (isProcessing.value) {
      // guard against double submission
      throw new Error('Checkout already in progress')
    }

    status.value = CheckoutStatus.PROCESSING
    error.value = null
    order.value = null

    try {
      const response = await fetcher(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.value, ...details }),
      })
      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      order.value = result
      status.value = CheckoutStatus.SUCCESS
      clearCart()
      return result
    } catch (err) {
      error.value = err
      status.value = CheckoutStatus.ERROR
      throw err
    }
  }

  /** Reset checkout state back to idle (e.g. to retry after an error). */
  function reset() {
    status.value = CheckoutStatus.IDLE
    error.value = null
    order.value = null
  }

  return {
    status: readonly(status),
    error: readonly(error),
    order: readonly(order),
    isProcessing,
    checkout,
    reset,
  }
}
