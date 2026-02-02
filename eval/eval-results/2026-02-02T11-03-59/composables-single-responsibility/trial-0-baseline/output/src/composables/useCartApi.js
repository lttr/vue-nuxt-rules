import { ref } from 'vue'

export function useCartApi(baseUrl = '/api/cart') {
  const loading = ref(false)
  const error = ref(null)

  async function request(method, path = '', body = null) {
    loading.value = true
    error.value = null
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      }
      if (body) options.body = JSON.stringify(body)
      const res = await fetch(`${baseUrl}${path}`, options)
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      }
      return await res.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCart() {
    return request('GET')
  }

  async function saveCart(items) {
    return request('PUT', '', { items })
  }

  async function addItemToServer(productId, quantity) {
    return request('POST', '/items', { productId, quantity })
  }

  async function removeItemFromServer(productId) {
    return request('DELETE', `/items/${productId}`)
  }

  async function applyCoupon(code) {
    return request('POST', '/coupon', { code })
  }

  async function removeCoupon() {
    return request('DELETE', '/coupon')
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItemToServer,
    removeItemFromServer,
    applyCoupon,
    removeCoupon,
  }
}
