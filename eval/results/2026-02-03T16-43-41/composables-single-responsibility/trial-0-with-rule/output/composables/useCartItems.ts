import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface UseCartItemsReturn {
  items: Ref<CartItem[]>
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getItem: (itemId: string) => CartItem | undefined
  itemCount: ComputedRef<number>
}

export function useCartItems(initialItems: CartItem[] = []): UseCartItemsReturn {
  const items = ref<CartItem[]>(initialItems)

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const existingItem = items.value.find(i => i.id === item.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...item, quantity })
    }
  }

  function removeItem(itemId: string): void {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number): void {
    const item = items.value.find(i => i.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart(): void {
    items.value = []
  }

  function getItem(itemId: string): CartItem | undefined {
    return items.value.find(item => item.id === itemId)
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    itemCount,
  }
}
