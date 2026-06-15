import { ref } from 'vue'
import { useCartState } from './useCartState'

// Responsibility: loading cart data from the API into shared state.
export function useFetchCart() {
  const { items } = useCartState()
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      const data = await res.json()
      items.value = data.items ?? []
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, error, fetchCart }
}
