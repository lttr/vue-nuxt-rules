import { ref } from 'vue'
import { useCart } from './useCart.js'

export function useCartApi(apiBase = '/api') {
  const loading = ref(false)
  const error = ref(null)
  const { addItem, clearCart } = useCart()

  async function fetchCart(userId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiBase}/cart/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.statusText}`)
      const data = await res.json()
      clearCart()
      data.items.forEach(item => addItem(item, item.quantity))
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function syncCart(userId, cartItems) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${apiBase}/cart/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      })
      if (!res.ok) throw new Error(`Failed to sync cart: ${res.statusText}`)
      return await res.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchCart, syncCart }
}
