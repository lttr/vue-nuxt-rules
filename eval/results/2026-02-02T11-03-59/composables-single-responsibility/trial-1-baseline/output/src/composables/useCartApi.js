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

  async function saveCart(items) {
    return request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify({ items }),
    })
  }

  async function addItemToServer(product, quantity) {
    return request(`${baseUrl}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId: product.id, quantity }),
    })
  }

  async function removeItemFromServer(productId) {
    return request(`${baseUrl}/items/${productId}`, {
      method: 'DELETE',
    })
  }

  async function updateItemOnServer(productId, quantity) {
    return request(`${baseUrl}/items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    })
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItemToServer,
    removeItemFromServer,
    updateItemOnServer,
  }
}
