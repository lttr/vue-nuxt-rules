import { ref } from 'vue'

export function useFetchCart() {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchCart = async (cartId) => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`/api/cart/${cartId}`)
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`)
      data.value = await res.json()
      return data.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    fetchCart,
  }
}
