import { ref, type Ref } from 'vue'
import { useCartItems, type CartItem } from './useCartItems'

const loading: Ref<boolean> = ref(false)
const error: Ref<string | null> = ref(null)

export function useFetchCart(apiBaseUrl = '/api') {
  const { setItems } = useCartItems()

  async function fetchCart(userId?: string): Promise<CartItem[]> {
    loading.value = true
    error.value = null

    try {
      const url = userId ? `${apiBaseUrl}/cart/${userId}` : `${apiBaseUrl}/cart`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.statusText}`)
      }

      const data: CartItem[] = await response.json()
      setItems(data)
      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch cart'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function syncCart(items: CartItem[], userId?: string): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const url = userId ? `${apiBaseUrl}/cart/${userId}` : `${apiBaseUrl}/cart`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error(`Failed to sync cart: ${response.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to sync cart'
      throw e
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
