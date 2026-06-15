import { ref, readonly } from 'vue'
import { useCart } from './useCart'

const DEFAULT_BASE_URL = '/api/cart'

/**
 * Handles communication with the cart API: fetching the persisted cart,
 * pushing local changes back to the server, and tracking request state.
 *
 * @param {object} [options]
 * @param {string} [options.baseUrl='/api/cart'] - Base endpoint for cart requests.
 * @param {typeof fetch} [options.fetcher=fetch] - Injectable fetch (eases testing).
 */
export function useCartApi(options = {}) {
  const { baseUrl = DEFAULT_BASE_URL, fetcher = fetch } = options
  const { setItems, items } = useCart()

  const loading = ref(false)
  const error = ref(null)

  async function request(path, init) {
    const response = await fetcher(`${baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    })
    if (!response.ok) {
      throw new Error(`Cart request failed: ${response.status} ${response.statusText}`)
    }
    // tolerate empty (204) responses
    const text = await response.text()
    return text ? JSON.parse(text) : null
  }

  /**
   * Load the cart from the server and populate local state.
   * @returns {Promise<Array>} the fetched cart items
   */
  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const data = await request('', { method: 'GET' })
      const fetched = data?.items ?? []
      setItems(fetched)
      return fetched
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Persist the current local cart back to the server.
   * @returns {Promise<any>} the server response
   */
  async function saveCart() {
    loading.value = true
    error.value = null
    try {
      return await request('', {
        method: 'PUT',
        body: JSON.stringify({ items: items.value }),
      })
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchCart,
    saveCart,
  }
}
