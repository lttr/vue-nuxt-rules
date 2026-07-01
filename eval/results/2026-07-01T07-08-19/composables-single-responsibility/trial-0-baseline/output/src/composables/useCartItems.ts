import { ref, computed } from 'vue'
import type { CartItem, Product } from '../types/cart'

const STORAGE_KEY = 'cart:items'

function loadInitialItems(): CartItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const items = ref<CartItem[]>(loadInitialItems())

function persist() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
}

export function useCartItems() {
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  function addItem(product: Product, quantity = 1) {
    if (quantity <= 0) return
    const existing = items.value.find((item) => item.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      })
    }
    persist()
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((item) => item.productId !== productId)
    persist()
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const existing = items.value.find((item) => item.productId === productId)
    if (existing) {
      existing.quantity = quantity
      persist()
    }
  }

  function clearCart() {
    items.value = []
    persist()
  }

  return {
    items,
    itemCount,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  }
}
