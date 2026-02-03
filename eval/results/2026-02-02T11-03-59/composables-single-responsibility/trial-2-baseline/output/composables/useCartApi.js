import { ref } from 'vue'

export function useCartApi(baseUrl = '/api/cart') {
  const loading = ref(false)
  const error = ref(null)

  async function request(url, options = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      })
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCart() {
    return request(baseUrl)
  }

  async function syncCart(items) {
    return request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify({ items }),
    })
  }

  async function addItemToServer(productId, quantity = 1) {
    return request(`${baseUrl}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async function removeItemFromServer(productId) {
    return request(`${baseUrl}/items/${productId}`, {
      method: 'DELETE',
    })
  }

  async function submitOrder(orderData) {
    return request(`${baseUrl}/checkout`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  return {
    loading,
    error,
    fetchCart,
    syncCart,
    addItemToServer,
    removeItemFromServer,
    submitOrder,
  }
}
