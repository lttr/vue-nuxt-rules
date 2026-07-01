import { ref } from 'vue'
import type { CartItem } from '../types/cart'
import { useCartItems } from './useCartItems'

const API_BASE = '/api/cart'

export function useCartApi() {
  const { items } = useCartItems()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCart(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`)
      }
      const data: CartItem[] = await response.json()
      items.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error fetching cart'
    } finally {
      isLoading.value = false
    }
  }

  async function syncCart(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items.value),
      })
      if (!response.ok) {
        throw new Error(`Failed to sync cart: ${response.status}`)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error syncing cart'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchCart,
    syncCart,
  }
}
