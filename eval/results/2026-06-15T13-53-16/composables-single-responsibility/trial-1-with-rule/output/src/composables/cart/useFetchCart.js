import { ref } from 'vue'
import { useCartState } from './useCartState'

/**
 * Fetch cart data from the API and hydrate shared cart state.
 *
 * Single responsibility: server I/O for loading the cart. Exposes
 * loading/error refs so views can render async states.
 */
export function useFetchCart() {
  const { _state, items } = useCartState()

  const loading = ref(false)
  const error = ref(null)

  async function fetchCart(cartId = 'me') {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`/api/carts/${cartId}`)
      if (!res.ok) throw new Error(`Failed to fetch cart (${res.status})`)
      const data = await res.json()
      // replace contents in place so reactivity + readonly view hold
      _state.items.splice(0, _state.items.length, ...(data.items ?? []))
      return data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchCart,
  }
}
