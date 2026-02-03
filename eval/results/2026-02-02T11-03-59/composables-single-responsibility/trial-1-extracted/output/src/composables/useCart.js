import { useFetchCart } from './useFetchCart'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart() {
  const { cartItems, loading: fetching, error: fetchError, fetchCart, syncCart } = useFetchCart()
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartItems(cartItems)
  const {
    subtotal,
    itemCount,
    discountCode,
    discountPercentage,
    discountAmount,
    total,
    applyDiscount,
    removeDiscount,
  } = useCartTotals(items)
  const { processing, error: checkoutError, order, checkout } = useCheckout(items, total, discountCode)

  async function checkoutAndClear(paymentDetails) {
    const success = await checkout(paymentDetails)
    if (success) {
      clearCart()
      removeDiscount()
    }
    return success
  }

  return {
    // State
    items,
    fetching,
    fetchError,
    processing,
    checkoutError,
    order,

    // Totals
    subtotal,
    itemCount,
    discountCode,
    discountPercentage,
    discountAmount,
    total,

    // Cart item actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // API actions
    fetchCart,
    syncCart,
    applyDiscount,
    removeDiscount,
    checkout: checkoutAndClear,
  }
}
