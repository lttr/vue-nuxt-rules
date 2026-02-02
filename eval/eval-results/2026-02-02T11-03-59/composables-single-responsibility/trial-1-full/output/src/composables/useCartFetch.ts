import { ref } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'

export function useCartFetch(apiBase = '/api/cart') {
  const { items } = useCartItems()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCart() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase)
      if (!response.ok) throw new Error(`Failed to fetch cart: ${response.statusText}`)
      const data: CartItem[] = await response.json()
      items.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  async function saveCart() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(apiBase, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items.value),
      })
      if (!response.ok) throw new Error(`Failed to save cart: ${response.statusText}`)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { fetchCart, saveCart, isLoading, error }
}
