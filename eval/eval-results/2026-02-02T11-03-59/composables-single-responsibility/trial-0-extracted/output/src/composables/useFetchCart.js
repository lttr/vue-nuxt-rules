import { ref } from 'vue'
import { useCartItems } from './useCartItems'

export function useFetchCart(fetchFn) {
  const loading = ref(false)
  const error = ref(null)
  const { items } = useCartItems()

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchFn()
      items.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchCart,
  }
}
