import { ref } from 'vue'

export function useCartItems(initialItems = []) {
  const items = ref([...initialItems])
  const error = ref(null)

  async function addItem(product, quantity = 1) {
    error.value = null
    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      })
      if (!res.ok) throw new Error(`Add failed: ${res.status}`)
      const added = await res.json()
      const existing = items.value.find(i => i.productId === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        items.value.push(added)
      }
    } catch (err) {
      error.value = err.message
    }
  }

  async function removeItem(productId) {
    error.value = null
    try {
      const res = await fetch(`/api/cart/items/${productId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Remove failed: ${res.status}`)
      items.value = items.value.filter(i => i.productId !== productId)
    } catch (err) {
      error.value = err.message
    }
  }

  function setItems(newItems) {
    items.value = [...newItems]
  }

  return { items, error, addItem, removeItem, setItems }
}
