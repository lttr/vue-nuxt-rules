import { useCartItems } from './useCartItems'
import { useCartApi, type CartApiOptions } from './useCartApi'
import { useCartTotals } from './useCartTotals'
import { useCheckout, type CheckoutOptions } from './useCheckout'

export interface UseCartOptions {
  api?: CartApiOptions
  checkout?: CheckoutOptions
}

export function useCart(options: UseCartOptions = {}) {
  const cartItems = useCartItems()
  const cartApi = useCartApi(options.api)
  const cartTotals = useCartTotals()
  const checkout = useCheckout(options.checkout)

  return {
    // Items
    items: cartItems.items,
    itemCount: cartItems.itemCount,
    isEmpty: cartItems.isEmpty,
    addItem: cartItems.addItem,
    removeItem: cartItems.removeItem,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,

    // API
    loading: cartApi.loading,
    apiError: cartApi.error,
    fetchCart: cartApi.fetchCart,
    saveCart: cartApi.saveCart,

    // Totals
    subtotal: cartTotals.subtotal,
    discountAmount: cartTotals.discountAmount,
    total: cartTotals.total,
    discount: cartTotals.discount,
    itemizedPrices: cartTotals.itemizedPrices,
    applyDiscount: cartTotals.applyDiscount,
    removeDiscount: cartTotals.removeDiscount,

    // Checkout
    checkoutStatus: checkout.status,
    checkoutError: checkout.error,
    lastOrder: checkout.lastOrder,
    canCheckout: checkout.canCheckout,
    processCheckout: checkout.processCheckout,
    resetCheckout: checkout.reset,
  }
}
