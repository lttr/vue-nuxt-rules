import { ref } from 'vue'
import { useCartState } from './useCartState'

export function useFetchCart() {
  const { setItems } = useCartState()
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error(`Failed to load cart: ${res.status}`)
      const data = await res.json()
      setItems(data.items ?? [])
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { fetchCart, loading, error }
}
