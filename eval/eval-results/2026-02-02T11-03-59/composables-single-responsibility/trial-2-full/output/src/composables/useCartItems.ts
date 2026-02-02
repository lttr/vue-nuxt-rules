import { ref, type Ref } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const items: Ref<CartItem[]> = ref([])

export function useCartItems() {
  function addItem(product: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
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

  return { items, addItem, removeItem, updateQuantity, clearCart }
}
