import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const cartItems = ref<CartItem[]>([])

export function useCart() {
  const itemCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  const isEmpty = computed(() => cartItems.value.length === 0)

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existingItem = cartItems.value.find(i => i.id === item.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ ...item, quantity })
    }
  }

  function removeItem(itemId: string) {
    const index = cartItems.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = cartItems.value.find(i => i.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  function getItem(itemId: string) {
    return cartItems.value.find(item => item.id === itemId)
  }

  return {
    items: cartItems,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
  }
}
