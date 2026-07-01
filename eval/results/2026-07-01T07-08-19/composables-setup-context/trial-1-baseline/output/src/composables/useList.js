import { ref, computed } from 'vue'

let nextId = 1

export function useList(initialItems = []) {
  const items = ref(initialItems.map((text) => ({ id: nextId++, text })))

  const count = computed(() => items.value.length)

  function addItem(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    items.value.push({ id: nextId++, text: trimmed })
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, count, addItem, removeItem, clear }
}
