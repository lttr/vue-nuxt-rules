import { ref, computed } from 'vue'

const items = ref([])

export function useCart() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(product, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId) {
    const index = items.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((item) => item.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  function setItems(newItems) {
    items.value = newItems
  }

  return {
    items,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  }
}
