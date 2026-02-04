import { useCartItems } from './useCartItems'
import { useFetchCart } from './useFetchCart'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart(apiBaseUrl = '/api') {
  const cartItems = useCartItems()
  const fetchCart = useFetchCart(apiBaseUrl)
  const cartTotals = useCartTotals()
  const checkout = useCheckout(apiBaseUrl)

  return {
    // Cart items
    items: cartItems.items,
    addItem: cartItems.addItem,
    removeItem: cartItems.removeItem,
    updateQuantity: cartItems.updateQuantity,
    clearCart: cartItems.clearCart,

    // Fetch/sync
    loading: fetchCart.loading,
    fetchError: fetchCart.error,
    fetchCart: fetchCart.fetchCart,
    syncCart: fetchCart.syncCart,

    // Totals & discounts
    itemCount: cartTotals.itemCount,
    subtotal: cartTotals.subtotal,
    discountAmount: cartTotals.discountAmount,
    total: cartTotals.total,
    appliedDiscount: cartTotals.appliedDiscount,
    applyDiscount: cartTotals.applyDiscount,
    removeDiscount: cartTotals.removeDiscount,
    validateDiscountCode: cartTotals.validateDiscountCode,

    // Checkout
    processing: checkout.processing,
    checkoutError: checkout.checkoutError,
    processCheckout: checkout.processCheckout,
    validateCheckout: checkout.validateCheckout,
  }
}

// Re-export types and individual composables for granular usage
export { useCartItems, type CartItem } from './useCartItems'
export { useFetchCart } from './useFetchCart'
export { useCartTotals, type Discount } from './useCartTotals'
export {
  useCheckout,
  type ShippingAddress,
  type PaymentMethod,
  type CheckoutResult,
} from './useCheckout'
