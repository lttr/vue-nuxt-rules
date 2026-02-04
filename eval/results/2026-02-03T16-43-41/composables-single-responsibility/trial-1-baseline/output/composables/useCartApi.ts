import { ref } from 'vue'
import { useCart, type CartItem } from './useCart'

export interface CartApiResponse {
  items: CartItem[]
  lastUpdated: string
}

export function useCartApi(baseUrl = '/api/cart') {
  const { items, clearCart, addItem } = useCart()
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchCart(): Promise<CartApiResponse | null> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`)
      }

      const data: CartApiResponse = await response.json()

      clearCart()
      for (const item of data.items) {
        addItem(
          { id: item.id, name: item.name, price: item.price, image: item.image },
          item.quantity
        )
      }

      return data
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function saveCart(): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.value }),
      })

      if (!response.ok) {
        throw new Error(`Failed to save cart: ${response.statusText}`)
      }

      return true
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function syncItem(itemId: string, quantity: number): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) {
        throw new Error(`Failed to sync item: ${response.statusText}`)
      }

      return true
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function removeItemFromServer(itemId: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/items/${itemId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`)
      }

      return true
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchCart,
    saveCart,
    syncItem,
    removeItemFromServer,
  }
}
