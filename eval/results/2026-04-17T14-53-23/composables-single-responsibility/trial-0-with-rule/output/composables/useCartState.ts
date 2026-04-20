import { ref, readonly } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const items = ref<CartItem[]>([])

export function useCartState() {
  return {
    items: readonly(items),
    setItems: (next: CartItem[]) => {
      items.value = next
    },
    mutate: (fn: (current: CartItem[]) => CartItem[]) => {
      items.value = fn(items.value)
    },
  }
}
