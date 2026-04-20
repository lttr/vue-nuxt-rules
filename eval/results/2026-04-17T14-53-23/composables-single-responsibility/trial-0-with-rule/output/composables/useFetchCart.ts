import { ref } from 'vue'
import { useCartState, type CartItem } from './useCartState'

export function useFetchCart() {
  const { setItems } = useCartState()
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      const data = (await res.json()) as { items: CartItem[] }
      setItems(data.items)
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  return { fetchCart, loading, error }
}
