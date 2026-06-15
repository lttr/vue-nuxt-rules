import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartApi } from './useCartApi'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

/**
 * Top-level shopping cart composable that wires together item management,
 * API persistence, totals/discounts, and checkout into one cohesive API.
 *
 * Use this in a component (or, for app-wide state, instantiate once and provide
 * it via `provide`/`inject` so every component shares the same cart).
 *
 * @param {Object} [options]
 * @param {Object} [options.api] - forwarded to useCartApi (baseUrl, client)
 * @param {Object} [options.checkout] - forwarded to useCheckout (endpoint, client)
 * @param {import('vue').Ref<number>|number} [options.taxRate=0]
 * @param {import('vue').Ref<Array>|Array} [options.discounts=[]]
 * @param {Array} [options.initialItems=[]]
 */
export function useCart(options = {}) {
  const {
    api: apiOptions,
    checkout: checkoutOptions,
    taxRate = 0,
    discounts = [],
    initialItems = [],
  } = options

  const itemsApi = useCartItems(initialItems)
  const api = useCartApi(apiOptions)
  const totals = useCartTotals(itemsApi.items, { taxRate, discounts })
  const checkoutApi = useCheckout(checkoutOptions)

  // Last applied discount code, handy for showing "code applied" in the UI.
  const appliedCode = ref(null)

  /** Load the cart from the server and replace local state with the result. */
  async function loadCart() {
    const serverItems = await api.fetchCart()
    itemsApi.setItems(serverItems)
    return serverItems
  }

  /** Push the current local cart to the server. */
  function syncCart() {
    return api.saveCart(itemsApi.items.value)
  }

  /**
   * Run checkout for the current cart, then clear it on success.
   * @param {Object} [details] - customer/payment info merged into the payload
   */
  async function checkout(details = {}) {
    const order = await checkoutApi.checkout({
      items: itemsApi.items.value,
      total: totals.total.value,
      ...details,
    })
    itemsApi.clear()
    appliedCode.value = null
    return order
  }

  return {
    // item state & mutators
    ...itemsApi,

    // computed monetary totals
    subtotal: totals.subtotal,
    discountTotal: totals.discountTotal,
    discountedSubtotal: totals.discountedSubtotal,
    tax: totals.tax,
    total: totals.total,

    // api state
    loading: api.loading,
    apiError: api.error,
    loadCart,
    syncCart,

    // checkout
    checkout,
    checkoutStatus: checkoutApi.status,
    checkoutError: checkoutApi.error,
    isCheckingOut: checkoutApi.isProcessing,
    order: checkoutApi.order,
    resetCheckout: checkoutApi.reset,

    appliedCode,
  }
}
