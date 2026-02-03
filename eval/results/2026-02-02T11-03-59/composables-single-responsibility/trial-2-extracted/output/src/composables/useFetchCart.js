import { ref } from 'vue'
import { useCartItems } from './useCartItems'

export function useFetchCart(apiBase = '/api/cart') {
  const { setItems } = useCartItems()
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase)
      if (!response.ok) throw new Error(`Failed to fetch cart: ${response.status}`)
      const data = await response.json()
      setItems(data.items ?? [])
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function syncCart(items) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!response.ok) throw new Error(`Failed to sync cart: ${response.status}`)
      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchCart,
    syncCart,
  }
}
