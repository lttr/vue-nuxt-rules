import { ref } from 'vue'
import { useCart } from './useCart.js'

const API_BASE = '/api/cart'

export function useCartApi() {
  const { setItems } = useCart()
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`)
      }
      const data = await response.json()
      setItems(data.items ?? [])
      return data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function syncCart(items) {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!response.ok) {
        throw new Error(`Failed to sync cart: ${response.status}`)
      }
      return await response.json()
    } catch (err) {
      error.value = err
      throw err
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
