import { ref } from 'vue'

export function useFetchCart() {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCart() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error('Failed to fetch cart')
      items.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchCart }
}
