import { ref } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'

export interface CartApiOptions {
  baseUrl?: string
  headers?: Record<string, string>
}

const DEFAULT_BASE_URL = '/api/cart'

export function useCartApi(options: CartApiOptions = {}) {
  const { baseUrl = DEFAULT_BASE_URL, headers = {} } = options
  const { setItems } = useCartItems()

  const loading = ref(false)
  const error = ref<string | null>(null)

  function defaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...headers,
    }
  }

  async function fetchCart(): Promise<CartItem[]> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(baseUrl, { headers: defaultHeaders() })
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      const data: CartItem[] = await res.json()
      setItems(data)
      return data
    } catch (err) {
      error.value = (err as Error).message
      return []
    } finally {
      loading.value = false
    }
  }

  async function saveCart(items: CartItem[]): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(baseUrl, {
        method: 'PUT',
        headers: defaultHeaders(),
        body: JSON.stringify(items),
      })
      if (!res.ok) throw new Error(`Failed to save cart: ${res.status}`)
      return true
    } catch (err) {
      error.value = (err as Error).message
      return false
    } finally {
      loading.value = false
    }
  }

  async function addItemToServer(
    productId: string,
    quantity: number
  ): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify({ productId, quantity }),
      })
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`)
      return true
    } catch (err) {
      error.value = (err as Error).message
      return false
    } finally {
      loading.value = false
    }
  }

  async function removeItemFromServer(itemId: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}/items/${itemId}`, {
        method: 'DELETE',
        headers: defaultHeaders(),
      })
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`)
      return true
    } catch (err) {
      error.value = (err as Error).message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItemToServer,
    removeItemFromServer,
  }
}
