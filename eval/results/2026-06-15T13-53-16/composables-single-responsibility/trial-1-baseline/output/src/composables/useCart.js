import { ref, computed, readonly } from 'vue'

/**
 * Module-level state so the cart is shared across every component that
 * calls `useCart()` (a singleton store). Components get reactive,
 * read-only access to the items plus mutation helpers.
 */
const items = ref([])

/** Find the index of a line item by product id. */
function indexOf(productId) {
  return items.value.findIndex((item) => item.productId === productId)
}

/**
 * Add a product to the cart. If the product is already present its
 * quantity is increased instead of creating a duplicate line.
 *
 * @param {{ productId: string|number, name: string, price: number, [key: string]: any }} product
 * @param {number} [quantity=1]
 */
function addItem(product, quantity = 1) {
  if (!product || product.productId == null) {
    throw new Error('addItem requires a product with a productId')
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error('quantity must be a positive number')
  }

  const existing = indexOf(product.productId)
  if (existing !== -1) {
    items.value[existing].quantity += quantity
    return
  }
  items.value.push({ ...product, quantity })
}

/**
 * Remove a line item entirely, regardless of its quantity.
 * @param {string|number} productId
 */
function removeItem(productId) {
  const idx = indexOf(productId)
  if (idx !== -1) {
    items.value.splice(idx, 1)
  }
}

/**
 * Set the absolute quantity for a line item. A quantity of 0 (or less)
 * removes the item.
 * @param {string|number} productId
 * @param {number} quantity
 */
function updateQuantity(productId, quantity) {
  const idx = indexOf(productId)
  if (idx === -1) return

  if (!Number.isFinite(quantity) || quantity <= 0) {
    items.value.splice(idx, 1)
    return
  }
  items.value[idx].quantity = quantity
}

/** Replace the entire cart contents (e.g. after fetching from the API). */
function setItems(newItems) {
  items.value = Array.isArray(newItems) ? [...newItems] : []
}

/** Empty the cart. */
function clearCart() {
  items.value = []
}

const itemCount = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity, 0)
)

const isEmpty = computed(() => items.value.length === 0)

/**
 * Shopping cart composable. Returns shared reactive state and the
 * mutations used to manage cart line items.
 */
export function useCart() {
  return {
    // expose state as read-only so callers mutate only through helpers
    items: readonly(items),
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    setItems,
    clearCart,
  }
}
