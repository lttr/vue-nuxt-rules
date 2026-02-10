import { ref, type Ref } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const items: Ref<CartItem[]> = ref([])

export function useCartItems() {
  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...item, quantity })
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    if (quantity <= 0) {
      removeItem(id)
    } else {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
