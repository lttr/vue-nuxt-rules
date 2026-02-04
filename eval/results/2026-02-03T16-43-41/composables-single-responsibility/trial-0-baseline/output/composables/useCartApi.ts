import { ref } from 'vue'
import type { CartItem } from './useCart'

export interface CartApiResponse {
  items: CartItem[]
  updatedAt: string
}

const API_BASE = '/api/cart'

export function useCartApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCart(): Promise<CartItem[]> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`)
      }
      const data: CartApiResponse = await response.json()
      return data.items
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch cart'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function saveCart(items: CartItem[]): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!response.ok) {
        throw new Error(`Failed to save cart: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to save cart'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function addItemToCart(item: CartItem): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add item'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function removeItemFromCart(itemId: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/items/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to remove item'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateItemQuantity(itemId: string, quantity: number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update quantity'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  }
}
