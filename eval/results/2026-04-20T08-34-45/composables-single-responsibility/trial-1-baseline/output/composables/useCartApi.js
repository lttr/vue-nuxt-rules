import { ref } from 'vue'
import { useCart } from './useCart'

export function useCartApi(baseUrl = '/api') {
  const loading = ref(false)
  const error = ref(null)
  const { items, addItem, clearCart } = useCart()

  async function fetchCart(userId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}/cart/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.statusText}`)
      const data = await res.json()
      clearCart()
      data.items.forEach((item) => addItem(item, item.quantity))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function syncCart(userId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}/cart/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.value }),
      })
      if (!res.ok) throw new Error(`Failed to sync cart: ${res.statusText}`)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchCart, syncCart }
}
