import { ref } from 'vue'

export function useFetchCart() {
  const cartItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error(`Failed to fetch cart: ${response.status}`)
      cartItems.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function syncCart(items) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      if (!response.ok) throw new Error(`Failed to sync cart: ${response.status}`)
      cartItems.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { cartItems, loading, error, fetchCart, syncCart }
}
