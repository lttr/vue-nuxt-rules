import { ref, computed } from 'vue'
import type { CartItem } from '../types/cart'

const items = ref<CartItem[]>([])

export function useCartItems() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function addItem(item: Omit<CartItem, 'id'> & { id?: string }) {
    const existing = items.value.find((i) => i.productId === item.productId)
    if (existing) {
      existing.quantity += item.quantity
      return existing
    }
    const newItem: CartItem = {
      ...item,
      id: item.id ?? crypto.randomUUID(),
    }
    items.value.push(newItem)
    return newItem
  }

  function removeItem(itemId: string) {
    const index = items.value.findIndex((i) => i.id === itemId)
    if (index !== -1) items.value.splice(index, 1)
  }

  function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    const item = items.value.find((i) => i.id === itemId)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  function setItems(newItems: CartItem[]) {
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
