import { useCartItems } from './useCartItems'
import { useFetchCart } from './useFetchCart'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart({ fetchFn, checkoutFn, discountRules = [] } = {}) {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartItems()
  const { loading, error: fetchError, fetchCart } = useFetchCart(fetchFn)
  const { subtotal, itemCount, discount, total } = useCartTotals(discountRules)
  const { processing, error: checkoutError, checkout } = useCheckout(checkoutFn)

  return {
    // State
    items,
    loading,
    processing,
    fetchError,
    checkoutError,

    // Totals
    subtotal,
    itemCount,
    discount,
    total,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    fetchCart,
    checkout,
  }
}
