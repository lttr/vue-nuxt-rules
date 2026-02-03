import { ref } from 'vue'
import { useCartItems } from './useCartItems'
import { useCartTotals } from './useCartTotals'

export function useCheckout(checkoutFn) {
  const processing = ref(false)
  const error = ref(null)
  const { items, clearCart } = useCartItems()
  const { total } = useCartTotals()

  async function checkout(details) {
    if (items.value.length === 0) {
      error.value = new Error('Cart is empty')
      return null
    }

    processing.value = true
    error.value = null
    try {
      const order = await checkoutFn({
        items: items.value,
        total: total.value,
        ...details,
      })
      clearCart()
      return order
    } catch (err) {
      error.value = err
      return null
    } finally {
      processing.value = false
    }
  }

  return {
    processing,
    error,
    checkout,
  }
}
