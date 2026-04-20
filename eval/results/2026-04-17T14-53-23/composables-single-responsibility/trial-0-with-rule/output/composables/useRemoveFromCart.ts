import { ref } from 'vue'
import { useCartState } from './useCartState'

export function useRemoveFromCart() {
  const { mutate } = useCartState()
  const pending = ref(false)
  const error = ref<Error | null>(null)

  async function removeFromCart(itemId: string) {
    pending.value = true
    error.value = null
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`)
      mutate((current) => current.filter((i) => i.id !== itemId))
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      pending.value = false
    }
  }

  return { removeFromCart, pending, error }
}
