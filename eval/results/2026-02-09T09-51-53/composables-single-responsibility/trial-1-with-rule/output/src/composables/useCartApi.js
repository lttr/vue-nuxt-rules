import { ref, shallowRef } from 'vue'

/**
 * Composable for fetching and syncing cart data with the API.
 */
export function useCartApi(apiBase = '/api/cart') {
  const cartData = shallowRef(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(apiBase)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      cartData.value = await res.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function syncCart(items) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(apiBase, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!res.ok) throw new Error(`Failed to sync cart: ${res.status}`)
      cartData.value = await res.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    cartData,
    loading,
    error,
    fetchCart,
    syncCart,
  }
}
