import { ref } from 'vue'

export function useAddToCart(items) {
  const adding = ref(false)
  const error = ref(null)

  async function addItem(product, quantity = 1) {
    adding.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      })
      if (!res.ok) throw new Error('Failed to add item')
      const added = await res.json()
      const existing = items.value.find(i => i.productId === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        items.value.push(added)
      }
    } catch (e) {
      error.value = e.message
    } finally {
      adding.value = false
    }
  }

  return { adding, error, addItem }
}
