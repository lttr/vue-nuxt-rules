import { useCartState } from './useCartState'

/**
 * Manage cart line items: add, remove and update quantities.
 *
 * Single responsibility: local mutation of the cart's item list.
 * It does not fetch, total or check out — those live in sibling composables.
 */
export function useCartItems() {
  const { _state, items } = useCartState()

  function addItem(product, quantity = 1) {
    if (!product?.id) throw new Error('addItem requires a product with an id')
    if (quantity <= 0) return

    const existing = _state.items.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      _state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })
    }
  }

  function removeItem(productId) {
    const index = _state.items.findIndex((i) => i.id === productId)
    if (index !== -1) _state.items.splice(index, 1)
  }

  function setQuantity(productId, quantity) {
    const item = _state.items.find((i) => i.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clear() {
    _state.items.splice(0, _state.items.length)
  }

  return {
    items,
    addItem,
    removeItem,
    setQuantity,
    clear,
  }
}
