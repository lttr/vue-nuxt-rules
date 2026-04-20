import { ref, computed } from 'vue'

export function useItems(initial = []) {
  const items = ref([...initial])

  function addItem(text) {
    const value = String(text ?? '').trim()
    if (!value) return
    items.value.push({ id: Date.now() + Math.random(), text: value })
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  const count = computed(() => items.value.length)

  return { items, count, addItem, removeItem, clear }
}
