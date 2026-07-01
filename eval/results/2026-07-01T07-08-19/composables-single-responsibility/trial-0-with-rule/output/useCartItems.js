import { ref, computed } from 'vue'

export function useCartItems(initialItems = []) {
  const items = ref(initialItems)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function addItem(product, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((item) => item.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    item.quantity = quantity
  }

  function clearItems() {
    items.value = []
  }

  return {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
  }
}
