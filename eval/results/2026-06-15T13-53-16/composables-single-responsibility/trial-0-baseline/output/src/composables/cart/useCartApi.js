import { ref } from 'vue'

const DEFAULT_BASE_URL = '/api/cart'

/**
 * Handles communication with the cart backend: loading the cart and
 * persisting changes. Tracks loading and error state so the UI can react.
 *
 * The composable is transport-agnostic by default (uses `fetch`) but accepts a
 * custom `client` for testing or to plug in axios/ofetch.
 *
 * @param {Object} [options]
 * @param {string} [options.baseUrl='/api/cart']
 * @param {(url: string, init?: object) => Promise<Response>} [options.client=fetch]
 */
export function useCartApi(options = {}) {
  const { baseUrl = DEFAULT_BASE_URL, client = fetch } = options

  const loading = ref(false)
  const error = ref(null)

  async function request(path = '', init = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await client(`${baseUrl}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
        ...init,
      })
      if (!response.ok) {
        throw new Error(`Cart request failed: ${response.status} ${response.statusText}`)
      }
      // A 204 (e.g. after a delete) has no body to parse.
      if (response.status === 204) return null
      return await response.json()
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  /** Fetch the current cart from the server. Resolves to an array of items. */
  async function fetchCart() {
    const data = await request('', { method: 'GET' })
    return data?.items ?? []
  }

  /**
   * Persist the full set of cart items to the server.
   * @param {Array} items
   */
  async function saveCart(items) {
    const data = await request('', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    })
    return data?.items ?? items
  }

  /**
   * Add a single item server-side.
   * @param {string|number} productId
   * @param {number} [quantity=1]
   */
  function addItem(productId, quantity = 1) {
    return request('/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  }

  /**
   * Remove a single item server-side.
   * @param {string|number} productId
   */
  function removeItem(productId) {
    return request(`/items/${encodeURIComponent(productId)}`, { method: 'DELETE' })
  }

  return {
    loading,
    error,
    fetchCart,
    saveCart,
    addItem,
    removeItem,
  }
}
