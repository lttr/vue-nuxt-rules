import { ref, computed } from 'vue'

/**
 * Manages the local collection of cart line items.
 *
 * A line item is identified by `id` (the product id). Adding a product that is
 * already in the cart increments its quantity rather than creating a duplicate.
 *
 * @param {Array} [initialItems=[]] - seed items, e.g. restored from storage
 * @returns cart item state and mutators
 */
export function useCartItems(initialItems = []) {
  const items = ref([...initialItems])

  const findIndex = (productId) => items.value.findIndex((i) => i.id === productId)

  /**
   * Add a product to the cart, or bump its quantity if already present.
   * @param {{ id: string|number, price: number, [key: string]: any }} product
   * @param {number} [quantity=1]
   */
  function addItem(product, quantity = 1) {
    if (product == null || product.id == null) {
      throw new Error('addItem requires a product with an id')
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error('quantity must be a positive number')
    }

    const index = findIndex(product.id)
    if (index === -1) {
      items.value.push({ ...product, quantity })
    } else {
      items.value[index].quantity += quantity
    }
  }

  /**
   * Remove a line item entirely, regardless of quantity.
   * @param {string|number} productId
   */
  function removeItem(productId) {
    const index = findIndex(productId)
    if (index !== -1) items.value.splice(index, 1)
  }

  /**
   * Set an exact quantity for a line item. A quantity of 0 (or less) removes it.
   * @param {string|number} productId
   * @param {number} quantity
   */
  function updateQuantity(productId, quantity) {
    const index = findIndex(productId)
    if (index === -1) return
    if (quantity <= 0) {
      items.value.splice(index, 1)
    } else {
      items.value[index].quantity = quantity
    }
  }

  /** Replace the whole cart, e.g. after syncing from the server. */
  function setItems(nextItems = []) {
    items.value = [...nextItems]
  }

  /** Empty the cart. */
  function clear() {
    items.value = []
  }

  const isEmpty = computed(() => items.value.length === 0)

  /** Total number of units across all line items. */
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const hasItem = (productId) => findIndex(productId) !== -1

  return {
    items,
    isEmpty,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    setItems,
    clear,
    hasItem,
  }
}
