import { ref } from 'vue'
import { useCartApi } from './useCartApi.js'
import { useCartItems } from './useCartItems.js'
import { useCartTotals } from './useCartTotals.js'
import { useCartCheckout } from './useCartCheckout.js'

/**
 * Unified cart composable that wires together the focused composables.
 * Use the individual composables directly if you only need a subset of features.
 */
export function useCart(options = {}) {
  const { apiBase = '/api/cart', checkoutUrl = '/api/checkout' } = options

  const discounts = ref([])

  const { cartData, loading, error, fetchCart, syncCart } = useCartApi(apiBase)
  const { items, itemCount, addItem, removeItem, updateQuantity, clearItems, setItems } =
    useCartItems()
  const { subtotal, discountAmount, total } = useCartTotals(items, discounts)
  const { processing, checkoutError, order, checkout } = useCartCheckout(checkoutUrl)

  async function loadCart() {
    await fetchCart()
    if (cartData.value?.items) {
      setItems(cartData.value.items)
    }
    if (cartData.value?.discounts) {
      discounts.value = cartData.value.discounts
    }
  }

  function applyDiscount(discount) {
    const existing = discounts.value.find((d) => d.code === discount.code)
    if (!existing) {
      discounts.value.push(discount)
    }
  }

  function removeDiscount(code) {
    discounts.value = discounts.value.filter((d) => d.code !== code)
  }

  async function processCheckout() {
    const result = await checkout(items.value, {
      subtotal: subtotal.value,
      discountAmount: discountAmount.value,
      total: total.value,
    })
    if (result) {
      clearItems()
      discounts.value = []
    }
    return result
  }

  return {
    // State
    items,
    itemCount,
    discounts,
    loading,
    error,
    processing,
    checkoutError,
    order,

    // Totals
    subtotal,
    discountAmount,
    total,

    // Cart item actions
    addItem,
    removeItem,
    updateQuantity,
    clearItems,

    // API actions
    loadCart,
    syncCart: () => syncCart(items.value),

    // Discount actions
    applyDiscount,
    removeDiscount,

    // Checkout
    processCheckout,
  }
}
