import { ref } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'

export function useFetchCart(apiBase = '/api/cart') {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { items } = useCartItems()

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`)
      }
      const data: CartItem[] = await response.json()
      items.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function syncCart() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items.value),
      })
      if (!response.ok) {
        throw new Error(`Failed to sync cart: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
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
