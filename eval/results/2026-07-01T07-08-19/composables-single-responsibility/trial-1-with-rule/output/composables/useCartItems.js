import { ref } from 'vue'

export function useCartItems(initialItems = []) {
  const items = ref(initialItems)

  function addItem(item, quantity = 1) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...item, quantity })
    }
  }

  function removeItem(itemId) {
    items.value = items.value.filter((i) => i.id !== itemId)
  }

  function updateQuantity(itemId, quantity) {
    const existing = items.value.find((i) => i.id === itemId)
    if (!existing) return
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    existing.quantity = quantity
  }

  function clearItems() {
    items.value = []
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
  }
}
