import { ref, computed } from 'vue'

const items = ref([])

export function useCartItems() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function addItem(product, quantity = 1) {
    const existing = items.value.find((item) => item.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? null,
        quantity,
      })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter((item) => item.productId !== productId)
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((i) => i.productId === productId)
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
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  }
}
