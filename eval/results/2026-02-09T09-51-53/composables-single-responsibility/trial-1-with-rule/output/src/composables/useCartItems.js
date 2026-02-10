import { ref, computed } from 'vue'

/**
 * Composable for managing cart items (add, remove, update quantity).
 */
export function useCartItems(initialItems = []) {
  const items = ref(initialItems)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

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
    const item = items.value.find((i) => i.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clearItems() {
    items.value = []
  }

  function setItems(newItems) {
    items.value = newItems
  }

  return {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    setItems,
  }
}
