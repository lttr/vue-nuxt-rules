import { ref } from 'vue'
import { useCartState } from './useCartState'

export function useAddToCart() {
  const { items, setItems } = useCartState()
  const pending = ref(false)
  const error = ref(null)

  async function addToCart(product, quantity = 1) {
    pending.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      })
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`)

      const existing = items.value.find((i) => i.productId === product.id)
      const next = existing
        ? items.value.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...items.value, { productId: product.id, product, quantity }]
      setItems(next)
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  return { addToCart, pending, error }
}
