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
    const existingItem = items.value.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...item, quantity })
    }
  }

  function removeItem(itemId: string) {
    const index = items.value.findIndex((i) => i.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = items.value.find((i) => i.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function setItems(newItems: CartItem[]) {
    items.value = newItems
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setItems,
  }
}
