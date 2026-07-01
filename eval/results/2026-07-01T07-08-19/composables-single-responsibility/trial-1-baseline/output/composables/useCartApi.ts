import { ref } from 'vue'
import type { CartItem } from '../types/cart'
import { useCartItems } from './useCartItems'

const CART_API_BASE = '/api/cart'

export function useCartApi() {
  const { setItems } = useCartItems()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCart() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(CART_API_BASE)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      const data: CartItem[] = await res.json()
      setItems(data)
      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error fetching cart'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function syncItem(item: CartItem) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`${CART_API_BASE}/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (!res.ok) throw new Error(`Failed to sync item: ${res.status}`)
      return await res.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error syncing item'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function removeItemRemote(itemId: string) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`${CART_API_BASE}/items/${itemId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error removing item'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchCart,
    syncItem,
    removeItemRemote,
  }
}
