import { ref } from 'vue'

export function useFetchCart(apiBaseUrl = '/api/cart') {
  const cart = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchCart(cartId) {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${apiBaseUrl}/${cartId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`)
      }
      cart.value = await response.json()
      return cart.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    cart,
    isLoading,
    error,
    fetchCart,
  }
}
