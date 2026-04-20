import { ref } from 'vue'
import { useCartState } from './useCartState'

export function useRemoveFromCart() {
  const { items, setItems } = useCartState()
  const pending = ref(false)
  const error = ref(null)

  async function removeFromCart(productId) {
    pending.value = true
    error.value = null
    try {
      const res = await fetch(`/api/cart/items/${productId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`)
      setItems(items.value.filter((i) => i.productId !== productId))
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  return { removeFromCart, pending, error }
}
