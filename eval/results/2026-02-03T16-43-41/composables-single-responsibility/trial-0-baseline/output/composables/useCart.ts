import { ref, computed, readonly } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const cartItems = ref<CartItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useCart() {
  const itemCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const isEmpty = computed(() => cartItems.value.length === 0)

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    const existing = cartItems.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({ ...item, quantity })
    }
  }

  function removeItem(itemId: string) {
    const index = cartItems.value.findIndex((i) => i.id === itemId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = cartItems.value.find((i) => i.id === itemId)
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
    return cartItems.value.find((i) => i.id === itemId)
  }

  return {
    items: readonly(cartItems),
    itemCount,
    isEmpty,
    loading: readonly(loading),
    error: readonly(error),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
  }
}
