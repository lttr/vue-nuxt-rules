import { useCartItems } from './useCartItems'
import { useFetchCart } from './useFetchCart'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart(apiBase = '/api') {
  const cartItems = useCartItems()
  const fetchCart = useFetchCart(`${apiBase}/cart`)
  const cartTotals = useCartTotals()
  const checkout = useCheckout(`${apiBase}/checkout`)

  return {
    // Cart items
    items: cartItems.items,
    addItem: cartItems.addItem,
    removeItem: cartItems.removeItem,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,

    // Fetch
    loading: fetchCart.loading,
    fetchError: fetchCart.error,
    fetchCart: fetchCart.fetchCart,
    syncCart: fetchCart.syncCart,

    // Totals & discounts
    subtotal: cartTotals.subtotal,
    itemCount: cartTotals.itemCount,
    discount: cartTotals.discount,
    discountAmount: cartTotals.discountAmount,
    total: cartTotals.total,
    applyDiscount: cartTotals.applyDiscount,
    removeDiscount: cartTotals.removeDiscount,

    // Checkout
    checkoutLoading: checkout.loading,
    checkoutError: checkout.error,
    checkoutResult: checkout.result,
    checkout: checkout.checkout,
  }
}
