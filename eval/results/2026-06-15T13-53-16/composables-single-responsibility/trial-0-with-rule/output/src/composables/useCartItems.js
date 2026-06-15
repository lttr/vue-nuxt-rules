import { useCartState } from './useCartState'

// Responsibility: mutating the set of cart items (add / remove / update qty).
export function useCartItems() {
  const { items } = useCartState()

  function addItem(product, quantity = 1) {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter((i) => i.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    const existing = items.value.find((i) => i.id === productId)
    if (!existing) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      existing.quantity = quantity
    }
  }

  function clear() {
    items.value = []
  }

  return { items, addItem, removeItem, updateQuantity, clear }
}
