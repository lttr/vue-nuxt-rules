import { ref, computed } from 'vue'

/** Checkout lifecycle states. */
export const CheckoutStatus = Object.freeze({
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
})

const DEFAULT_ENDPOINT = '/api/checkout'

/**
 * Drives the checkout process: submits the order, exposes status flags, and
 * surfaces the resulting order (or error) for the UI.
 *
 * @param {Object} [options]
 * @param {string} [options.endpoint='/api/checkout']
 * @param {(url: string, init?: object) => Promise<Response>} [options.client=fetch]
 */
export function useCheckout(options = {}) {
  const { endpoint = DEFAULT_ENDPOINT, client = fetch } = options

  const status = ref(CheckoutStatus.IDLE)
  const error = ref(null)
  const order = ref(null)

  const isProcessing = computed(() => status.value === CheckoutStatus.PROCESSING)
  const isSuccess = computed(() => status.value === CheckoutStatus.SUCCESS)

  /**
   * Submit the order for payment/fulfilment.
   *
   * @param {Object} payload
   * @param {Array} payload.items - cart line items
   * @param {number} payload.total - final amount payable
   * @param {Object} [payload.customer] - shipping/billing details
   * @param {Object} [payload.payment] - payment method / token
   * @returns {Promise<Object>} the created order
   */
  async function checkout(payload) {
    if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
      const err = new Error('Cannot checkout an empty cart')
      status.value = CheckoutStatus.ERROR
      error.value = err
      throw err
    }

    status.value = CheckoutStatus.PROCESSING
    error.value = null
    order.value = null

    try {
      const response = await client(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        // Try to extract a server-provided error message, but don't fail if absent.
        let detail = `${response.status} ${response.statusText}`
        try {
          const body = await response.json()
          if (body?.message) detail = body.message
        } catch {
          /* response had no JSON body */
        }
        throw new Error(`Checkout failed: ${detail}`)
      }

      order.value = await response.json()
      status.value = CheckoutStatus.SUCCESS
      return order.value
    } catch (err) {
      error.value = err
      status.value = CheckoutStatus.ERROR
      throw err
    }
  }

  /** Reset state so the user can start a new checkout. */
  function reset() {
    status.value = CheckoutStatus.IDLE
    error.value = null
    order.value = null
  }

  return {
    status,
    error,
    order,
    isProcessing,
    isSuccess,
    checkout,
    reset,
  }
}
