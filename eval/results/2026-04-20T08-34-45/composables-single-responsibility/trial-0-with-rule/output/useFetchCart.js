import { ref } from 'vue'

export function useFetchCart() {
  const cart = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart(userId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`/api/cart/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      cart.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { cart, loading, error, fetchCart }
}
