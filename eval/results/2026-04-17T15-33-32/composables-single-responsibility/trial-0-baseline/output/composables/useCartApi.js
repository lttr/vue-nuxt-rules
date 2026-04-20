import { ref } from 'vue'

const API_BASE = '/api/cart'

export function useCartApi() {
  const loading = ref(false)
  const error = ref(null)

  const request = async (path, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      })
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      return await response.json()
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCart = () => request('')

  const saveCart = (items) =>
    request('', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    })

  const applyPromoCode = (code) =>
    request('/promo', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    applyPromoCode,
  }
}
