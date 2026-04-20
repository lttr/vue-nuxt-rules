import { ref, computed } from 'vue'

const items = ref([])

export function useCartItems() {
  const addItem = (product, quantity = 1) => {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })
    }
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex((i) => i.id === productId)
    if (index !== -1) items.value.splice(index, 1)
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((i) => i.id === productId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      item.quantity = quantity
    }
  }

  const clear = () => {
    items.value = []
  }

  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  return {
    items,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}
