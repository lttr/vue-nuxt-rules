import { ref } from 'vue'
import { useCartState, type CartItem } from './useCartState'

export function useAddToCart() {
  const { mutate } = useCartState()
  const pending = ref(false)
  const error = ref<Error | null>(null)

  async function addToCart(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    pending.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, quantity }),
      })
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`)
      mutate((current) => {
        const existing = current.find((i) => i.id === item.id)
        if (existing) {
          return current.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
          )
        }
        return [...current, { ...item, quantity }]
      })
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      pending.value = false
    }
  }

  return { addToCart, pending, error }
}
