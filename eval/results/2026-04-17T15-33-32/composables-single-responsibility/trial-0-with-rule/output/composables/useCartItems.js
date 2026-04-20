import { ref, computed } from 'vue'

const items = ref([])

export function useCartItems() {
  const addItem = (product, quantity = 1) => {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
      return
    }
    items.value.push({ ...product, quantity })
  }

  const removeItem = (productId) => {
    items.value = items.value.filter((i) => i.id !== productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((i) => i.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    item.quantity = quantity
  }

  const clear = () => {
    items.value = []
  }

  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  return {
    items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}
