import { useCartItems } from './useCartItems'
import { useFetchCart } from './useFetchCart'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart() {
  const cartItems = useCartItems()
  const fetchCart = useFetchCart()
  const cartTotals = useCartTotals()
  const checkout = useCheckout()

  return {
    // Items
    items: cartItems.items,
    itemCount: cartItems.itemCount,
    addItem: cartItems.addItem,
    removeItem: cartItems.removeItem,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,

    // Fetching
    loading: fetchCart.loading,
    fetchError: fetchCart.error,
    fetchCart: fetchCart.fetchCart,
    syncCart: fetchCart.syncCart,

    // Totals & discounts
    subtotal: cartTotals.subtotal,
    discountCode: cartTotals.discountCode,
    discountPercent: cartTotals.discountPercent,
    discountAmount: cartTotals.discountAmount,
    total: cartTotals.total,
    applyDiscount: cartTotals.applyDiscount,
    clearDiscount: cartTotals.clearDiscount,

    // Checkout
    processing: checkout.processing,
    checkoutError: checkout.error,
    lastOrder: checkout.lastOrder,
    checkout: checkout.checkout,
  }
}
