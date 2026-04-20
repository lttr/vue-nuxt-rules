import { ref } from 'vue'

export function useRemoveFromCart(items) {
  const removing = ref(false)
  const error = ref(null)

  async function removeItem(itemId) {
    removing.value = true
    error.value = null
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to remove item')
      items.value = items.value.filter(i => i.id !== itemId)
    } catch (e) {
      error.value = e.message
    } finally {
      removing.value = false
    }
  }

  return { removing, error, removeItem }
}
