import { ref, computed } from 'vue'

const items = ref([])

export function useCartItems() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function setItems(newItems) {
    items.value = newItems.map((item) => ({
      ...item,
      quantity: item.quantity ?? 1,
    }))
  }

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
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    isEmpty,
    setItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
