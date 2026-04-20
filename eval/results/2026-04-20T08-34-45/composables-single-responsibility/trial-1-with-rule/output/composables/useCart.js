import { ref } from 'vue'
import { useFetchCart } from './useFetchCart'
import { useAddToCart } from './useAddToCart'
import { useRemoveFromCart } from './useRemoveFromCart'
import { useCartTotals } from './useCartTotals'
import { useCheckout } from './useCheckout'

export function useCart(discountCode = ref(null)) {
  const { items, loading, error: fetchError, fetchCart } = useFetchCart()
  const { adding, error: addError, addItem } = useAddToCart(items)
  const { removing, error: removeError, removeItem } = useRemoveFromCart(items)
  const { subtotal, discount, total, itemCount } = useCartTotals(items, discountCode)
  const { processing, error: checkoutError, orderId, checkout } = useCheckout(items)

  return {
    items,
    loading, adding, removing, processing,
    fetchError, addError, removeError, checkoutError,
    subtotal, discount, total, itemCount,
    orderId,
    fetchCart, addItem, removeItem, checkout,
  }
}
